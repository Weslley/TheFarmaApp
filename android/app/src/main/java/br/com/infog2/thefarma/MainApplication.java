package br.com.infog2.thefarma;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import org.reactnative.camera.RNCameraPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.cardio.RNCardIOPackage;
import io.realm.react.RealmReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.shell.MainReactPackage;

//import com.facebook.CallbackManager;
//import com.facebook.FacebookSdk;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    /*
     * public static CallbackManager mCallbackManager = new
     * CallbackManager.Factory().create();
     *
     * protected static CallbackManager getCallbackManager() { return
     * mCallbackManager; }
     */

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new BackgroundTimerPackage(),
            new RNGooglePlacesPackage(),
                new AsyncStoragePackage(),
                new RNGestureHandlerPackage(),
                new RNFirebasePackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage(),
                new RNCameraPackage(),
                new RNDeviceInfo(),
                new RNCardIOPackage(),
                new RealmReactPackage(),
                new SnackbarPackage(),
                new VectorIconsPackage(),
                new LinearGradientPackage(),
                new RNFusedLocationPackage()
            );
            // new FBSDKPackage(mCallbackManager),
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        /*
         * FacebookSdk.setApplicationId("1131794176870212");
         * FacebookSdk.sdkInitialize(getApplicationContext());
         * AppEventsLogger.activateApp(this);
         */

        SoLoader.init(this, /* native exopackage */ false);
    }
}
