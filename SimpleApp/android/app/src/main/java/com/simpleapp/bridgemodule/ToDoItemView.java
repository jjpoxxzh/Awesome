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
import com.simpleapp.view.ItemTextView;


/**
 * 视图管理类：ToDoItemView，管理的对象类型为：ToDoListItemView
 */
public class ToDoItemView extends SimpleViewManager<ItemTextView> implements View.OnTouchListener {

    private ReactContext mContext;

    @Override
    public String getName() {
        return "ToDoItemView";
    }

    @Override
    protected ItemTextView createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        ItemTextView toDoListItemView = new ItemTextView(mContext);
        toDoListItemView.setOnTouchListener(this);
        return toDoListItemView;
    }

    @ReactProp(name = "text")
    public void setText(ItemTextView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize")
    public void setTextSize(ItemTextView view, float fontSize) {
        view.setTextSize(fontSize);
    }

    @ReactProp(name = "textColor", defaultInt = Color.BLACK)
    public void setTextColor(ItemTextView view, int textColor) {
        view.setTextColor(textColor);
    }

    @ReactProp(name = "isAlpha", defaultBoolean = false)
    public void setTextAlpha(ItemTextView view, boolean isAlpha) {
        if (isAlpha) {
            view.setAlpha(0.5f);
        }
    }

    /**
     * 映射关系位于UIManagerModuleConstants.java，事件名topChange在JS端映射到onChange回调属性上
     */
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        WritableMap params = Arguments.createMap();
        params.putString("message", "MyMessage");
        mContext.getJSModule(RCTEventEmitter.class).receiveEvent(v.getId(), "topChange", params);
        return false;
    }
}



