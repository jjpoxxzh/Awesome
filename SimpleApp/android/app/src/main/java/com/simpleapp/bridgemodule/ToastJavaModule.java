package com.simpleapp.bridgemodule;

import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * 封装Toast.show()方法给js用.
 */
class ToastJavaModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";


    public ToastJavaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    /**
     * 定义给JS使用的常量
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        map.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return map;
    }

    @Override
    public boolean hasConstants() {
        return true;
    }

    /**
     * 弹出Taost提示
     *
     * @param message 格式为{message:'',size:0,flag:true}
     * @param duration
     */
    @ReactMethod
    public void show(ReadableMap message, int duration) {
        String str = message.getString("message") + "";
        Toast.makeText(getReactApplicationContext(), str, duration).show();
    }

    /**
     * 回调函数
     *
     * @param type
     * @param successCallback
     * @param errorCallback
     */
    @ReactMethod
    public void pass(int type, Callback successCallback, Callback errorCallback) {
        int value = (int) (Math.random() * 10) + 1;
        if (value != type) {
            successCallback.invoke(value);
        } else {
            errorCallback.invoke("二者相等");
        }
        System.out.println(type + "-" + value);
    }

    /**
     * Promise
     *
     * @param type
     * @param promise
     */
    @ReactMethod
    public void operate(int type, Promise promise) {
        int value = (int) (Math.random() * 10) + 1;
        System.out.println(type + "-" + value);
        if (type >= value) {
            WritableMap map = Arguments.createMap();
            map.putString("name", "lj");
            map.putInt("age", 100);
            promise.resolve(map);
        } else {
            //promise.reject(new Throwable("遇到一个异常"));
            promise.reject("fail", "遇到一个异常");
        }
    }


    /**
     * 发送事件
     */
    @ReactMethod
    public void tell() {
        try {
            Thread.sleep(4 * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WritableMap params = Arguments.createMap();
        params.putString("title", "警告");
        params.putString("text", "快闪开，要爆炸了");
        sendEvent(getReactApplicationContext(), "hello", params);
    }


    /**
     * 向JS发送事件（通知）
     *
     * @param reactContext
     * @param eventName
     * @param params
     */
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
