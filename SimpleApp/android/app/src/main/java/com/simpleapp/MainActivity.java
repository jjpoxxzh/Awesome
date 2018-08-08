package com.simpleapp;

import android.view.KeyEvent;
import android.view.View;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

//    private final DoubleTapRecognizer doubleTapMenuRecognizer = new DoubleTapRecognizer(KeyEvent.KEYCODE_D);

    @Override
    protected String getMainComponentName() {
        return "SimpleApp";
    }

//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        View currentFocus = getCurrentFocus();
//        if (doubleTapMenuRecognizer.didDoubleTap(keyCode, currentFocus)) {
//            getReactInstanceManager().getDevSupportManager().showDevOptionsDialog();
//            return true;
//        }
//        return super.onKeyUp(keyCode, event);
//    }
}
