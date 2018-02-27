#import <Foundation/Foundation.h>

#if __has_include(<FirebaseDynamicLinks/FIRDynamicLinks.h>)
#import "Firebase.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface FirebaseLinks : RCTEventEmitter<RCTBridgeModule> {
  
}

+ (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation;

+ (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler;

@end

#else
@interface FirebaseLinks : NSObject
@end
#endif


