package com.simpleapp.bridgemodule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/10/13.
 */

public class CommonReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<NativeModule>();
        list.add(new ToastJavaModule(reactContext));
        list.add(new ImagePickerModule(reactContext));
        list.add(new ImageFetchModule(reactContext));
        list.add(new WeChatModule(reactContext));
        return list;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> list = new ArrayList<ViewManager>();
        list.add(new CircleImageView(reactContext));
        list.add(new ToDoItemView());
        list.add(new LetterIndexView());
        list.add(new LottieAnimationViewManager());
        return list;
    }
}
