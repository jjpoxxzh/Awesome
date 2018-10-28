package com.simpleapp.bridgemodule;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.simpleapp.view.ItemTextView;

import java.util.Map;


/**
 * 视图管理类：RNItemTextView，管理的对象类型为：ToDoListItemView
 */
public class RNItemTextView extends SimpleViewManager<ItemTextView> implements ItemTextView.OnCustomBehavior {

    private ReactContext mContext;

    @Override
    public String getName() {
        return "RNItemTextView";
    }

    @Override
    protected ItemTextView createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        ItemTextView toDoListItemView = new ItemTextView(mContext);
        toDoListItemView.setCustomBehavior(this);
        return toDoListItemView;
    }

    @ReactProp(name = "text")
    public void setText(ItemTextView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize", defaultFloat = 16.0f)
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

//    @Override
//    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
//        Map<String, String> map1 = MapBuilder.of("bubbled", "onChange");
//        Map<String, Map<String, String>> map2 = MapBuilder.of("phasedRegistrationNames", map1);
//        Map<String, Object> map3 = MapBuilder.of("topChange", (Object) map2);
//        return map3;
//    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "topChange",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onChange")))
                .build();
    }

    private void receiveEvent(int viewId, String eventName, WritableMap params) {
        mContext.getJSModule(RCTEventEmitter.class).receiveEvent(viewId, eventName, params);
    }

    @Override
    public void onTouch(View view) {
        /**
         * 触碰方法，由于是给JS响应，而不是给用于原生重写内容，故直接触发通知来引起JS事件
         * 映射关系位于UIManagerModuleConstants.java，事件名topChange在JS端映射到onChange回调属性上
         */
        WritableMap params = Arguments.createMap();
        params.putString("message", "Touch");
        receiveEvent(view.getId(), "topChange", params);
        System.out.println("----onTouchEvent----");
    }

    @Override
    public void onLongClick(View view) {
        WritableMap params = Arguments.createMap();
        params.putString("message", "LongClick");
        receiveEvent(view.getId(), "topChange", params);
        System.out.println("----onLongClick----");
    }
}



