package com.lj.rntester;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {

    /**
     * 重写ReactActivityDelegate类，可用于实现路由机制。比如从其它应用直接跳转到RN应用某个功能界面，
     * 但测试发现并不是每次都能正确跳转，没有正确跳转时，甚至不能返回到原应用。
     */
    public static class RNTesterActivityDelegate extends ReactActivityDelegate {

        private static final String PARAM_ROUTE = "route";
        private Bundle mInitialProps = null;
        private final @Nullable Activity mActivity;

        public RNTesterActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            // Get remote param before calling super which uses it
            Bundle bundle = mActivity.getIntent().getExtras();
            if (bundle != null && bundle.containsKey(PARAM_ROUTE)) {
                String routeUri = new StringBuilder("rntester://example/")
                        .append(bundle.getString(PARAM_ROUTE))
                        .append("Example")
                        .toString();
                mInitialProps = new Bundle();
                mInitialProps.putString("exampleFromAppetizeParams", routeUri);
            }
            super.onCreate(savedInstanceState);
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new RNTesterActivityDelegate(this, getMainComponentName());
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNTesterApp";
    }

}
