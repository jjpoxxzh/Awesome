package com.simpleapp.bridgemodule;


import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.simpleapp.view.FScrollView1;


public class FlexScrollView extends ViewGroupManager<FScrollView1> {

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


    @Override
    public void addView(FScrollView1 parent, View child, int index) {
//        parent.getContentLayout().addView(child, index);
    }

}
