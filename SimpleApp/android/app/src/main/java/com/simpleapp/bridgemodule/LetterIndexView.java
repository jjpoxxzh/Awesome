package com.simpleapp.bridgemodule;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.simpleapp.view.LetterView;

/**
 * Created by Administrator on 2018/1/11.
 */

public class LetterIndexView extends SimpleViewManager<LetterView> implements LetterView.OnTouchLettersListener {

    private ReactContext mContext;
    private RCTEventEmitter rctemit;

    @Override
    public String getName() {
        return "LetterIndexView";
    }

    @Override
    protected LetterView createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        rctemit = mContext.getJSModule(RCTEventEmitter.class);
        LetterView lv = new LetterView(mContext);
        lv.setOnTouchLettersListener(this);
        return lv;
    }


    @Override
    public void onTouchLettersDown(LetterView lv, String letter) {
        WritableMap params = Arguments.createMap();
        params.putString("message", "down");
        bindJSModule(lv, /*TouchEventType.START.getJSEventName()*/"topChange", params);
    }


    @Override
    public void onTouchLettersUp(LetterView lv) {
        WritableMap params = Arguments.createMap();
        params.putString("message", "up");
        bindJSModule(lv, /*TouchEventType.END.getJSEventName()*/"topChange", params);
    }

    private void bindJSModule(LetterView lv, String jsEventName, WritableMap params) {
        rctemit.receiveEvent(lv.getId(), jsEventName, params);
    }

}
