
@import Firebase;
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface DeepLink : RCTEventEmitter <RCTBridgeModule>

+ (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)URL
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation;

+ (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler;

@end
