package com.simpleapp.bridgemodule;


import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.simpleapp.view.FScrollView1;


public class FlexScrollView extends SimpleViewManager<FScrollView1> {

    private ReactContext mContext;

    @Override
    public String getName() {
        return "FlexScrollView";
    }

    @Override
    protected FScrollView1 createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        FScrollView1 fScrollView1 = new FScrollView1(mContext);
        return fScrollView1;
    }

    @ReactProp(name = "child")
    public void setChild(FScrollView1 fs, @Nullable ReadableMap child) {
        View view = (View) child;
        fs.appendView(view);
    }
}
