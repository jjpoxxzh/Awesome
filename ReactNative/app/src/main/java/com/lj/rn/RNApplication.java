package com.lj.rn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.lj.rn.reactmodule.CommonBridgePackage;

import java.util.Arrays;
import java.util.List;

/**
 * 没什么实际意义.
 */
public class RNApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "js/index.android";
        }
    };


    @Override
    public void onCreate() {
        super.onCreate();
    }

    protected List<ReactPackage> getPackages(){
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new CommonBridgePackage());
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return null;
    }
}
