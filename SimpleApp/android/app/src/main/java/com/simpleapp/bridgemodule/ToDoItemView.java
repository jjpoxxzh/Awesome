package com.simpleapp.bridgemodule;

import android.graphics.Color;
import android.view.MotionEvent;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.simpleapp.view.ToDoListItemView;


/**
 * Created by Administrator on 2018/1/11.
 */

public class ToDoItemView extends SimpleViewManager<ToDoListItemView> implements View.OnTouchListener {

    private ReactContext mContext;

    @Override
    public String getName() {
        return "ToDoItemView";
    }

    @Override
    protected ToDoListItemView createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        ToDoListItemView toDoListItemView = new ToDoListItemView(mContext);
        toDoListItemView.setOnTouchListener(this);
        return toDoListItemView;
    }

    @ReactProp(name = "text")
    public void setText(ToDoListItemView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize")
    public void setTextSize(ToDoListItemView view, float fontSize) {
        view.setTextSize(fontSize);
    }

    @ReactProp(name = "textColor", defaultInt = Color.BLACK)
    public void setTextColor(ToDoListItemView view, int textColor) {
        view.setTextColor(textColor);
    }

    @ReactProp(name = "isAlpha", defaultBoolean = false)
    public void setTextAlpha(ToDoListItemView view, boolean isAlpha) {
        if (isAlpha) {
            view.setAlpha(0.5f);
        }
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        WritableMap params = Arguments.createMap();
        params.putString("message", "MyMessage");
        mContext.getJSModule(RCTEventEmitter.class).receiveEvent(v.getId(), "topChange", params);
        return false;
    }
}



