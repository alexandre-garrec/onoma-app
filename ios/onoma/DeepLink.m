@import Firebase;
#import "DeepLink.h"

#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>

NSString *const RCTOpenURLNotification2 = @"RCTOpenURLNotification";

@implementation DeepLink

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)startObserving
{
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleOpenURLNotification:)
                                               name:RCTOpenURLNotification2
                                             object:nil];
}

- (void)stopObserving
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"firebase_link"];
}


+ (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  FIRDynamicLink *dynamicLink =
  [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  
  if (dynamicLink) {
    NSDictionary<NSString *, id> *payload = @{@"url": dynamicLink.url.absoluteString};
    [[NSNotificationCenter defaultCenter] postNotificationName:RCTOpenURLNotification2
                                                        object:self
                                                      userInfo:payload];
  }
  
  return YES;
}

+ (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler
{
    [[FIRDynamicLinks dynamicLinks]
     handleUniversalLink:userActivity.webpageURL
     completion:^(FIRDynamicLink * _Nullable dynamicLink,
                  NSError * _Nullable error) {
       NSDictionary *payload = @{@"url": dynamicLink.url.absoluteString};
       [[NSNotificationCenter defaultCenter] postNotificationName:RCTOpenURLNotification2
                                                           object:self
                                                         userInfo:payload];
     }];
  
  return YES;
}

- (void)handleOpenURLNotification:(NSNotification *)notification
{
  [self sendEventWithName:@"firebase_link" body:notification.userInfo];
}

@end
