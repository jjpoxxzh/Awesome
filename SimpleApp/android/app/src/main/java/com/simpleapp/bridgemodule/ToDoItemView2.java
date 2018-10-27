package com.simpleapp.bridgemodule;

import android.graphics.Color;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.simpleapp.view.ToDoListItemView;

import java.util.Map;

import javax.annotation.Nullable;


/**
 * 视图管理类：ToDoItemView2，管理的对象类型为：ToDoListItemView
 */
public class ToDoItemView2 extends SimpleViewManager<ToDoListItemView> {


    @Override
    public String getName() {
        return "ToDoItemView2";
    }

    @Override
    protected ToDoListItemView createViewInstance(ThemedReactContext reactContext) {
        return new ToDoListItemView(reactContext);
    }

    @ReactProp(name = "text")
    public void setText(ToDoListItemView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize", defaultFloat = 16.0f)
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

}



