#import "FirebaseLinks.h"

#if __has_include(<FirebaseDynamicLinks/FIRDynamicLink.h>)

static NSString *const LINKS_DYNAMIC_LINK_RECEIVED = @"dynamic_link_received";

static void sendDynamicLink(NSURL *url, id sender) {
  [[NSNotificationCenter defaultCenter] postNotificationName:LINKS_DYNAMIC_LINK_RECEIVED
                                                      object:sender
                                                    userInfo:@{@"url": url.absoluteString}];
}

@implementation FirebaseLinks{
  bool hasListeners;
  NSString *initialLink;
}

RCT_EXPORT_MODULE();

- (id)init {
  self = [super init];
  if (self != nil) {
    NSLog(@"Setting up FirebaseLinks instance");
    [self initialiseLinks];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}


// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}


- (void)initialiseLinks {
  // Set up internal listener to send notification over bridge
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(sendDynamicLinkEvent:)
                                               name:LINKS_DYNAMIC_LINK_RECEIVED
                                             object:nil];
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

+ (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [self handleLinkFromCustomSchemeURL:url];
}

+(BOOL)handleLinkFromCustomSchemeURL:(NSURL *)url {
  FIRDynamicLink *dynamicLink =
  [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  if (dynamicLink && dynamicLink.url) {
    sendDynamicLink(dynamicLink.url, self);
    return YES;
  }
  return NO;
}

+ (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {
  BOOL handled = [[FIRDynamicLinks dynamicLinks]
                  handleUniversalLink:userActivity.webpageURL
                  completion:^(FIRDynamicLink * _Nullable dynamicLink, NSError * _Nullable error) {
                    if (error != nil){
                      NSLog(@"Failed to handle universal link: %@", [error localizedDescription]);
                    }
                    else {
                      if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
                        NSURL* url = dynamicLink ? dynamicLink.url : userActivity.webpageURL;
                        sendDynamicLink(url, self);
                      }
                    }
                  }];
  return handled;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[LINKS_DYNAMIC_LINK_RECEIVED];
}

- (void)sendDynamicLinkEvent:(NSNotification *)notification {
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:LINKS_DYNAMIC_LINK_RECEIVED body:notification.userInfo[@"url"]];
  } else if (notification.userInfo) {
    initialLink = notification.userInfo[@"url"];
    NSLog(@"no listener");
  }
}


RCT_EXPORT_METHOD(getInitialLink:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if (initialLink) {
    resolve(initialLink);
  } else {
    resolve((id)kCFNull);
  }
}

@end

#else
@implementation FirebaseLinks
@end
#endif

