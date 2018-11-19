package com.simpleapp.bridgemodule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义的通用桥接模块
 * Created by Administrator on 2017/10/13.
 */
public class CommonReactPackage implements ReactPackage {

    /**
     * 自定义原生功能模块
     *
     * @param reactContext
     * @return
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<NativeModule>();
        list.add(new ToastJavaModule(reactContext));    // 添加Toast模块(弹Toast图片)
        list.add(new ImagePickerModule(reactContext));  // 添加ImagePicker模块(选取图片、BaseActivityEventListener)
        list.add(new ImageFetchModule(reactContext));   // 添加ImageFetch模块(选取图片、ActivityEventListener)
        return list;
    }

    /**
     * 自定义的原生视图
     *
     * @param reactContext
     * @return
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> list = new ArrayList<ViewManager>();
        list.add(new CircleImageView(reactContext));    // 圆形视图
        list.add(new RNItemTextView());   // 自定义的TextView
        list.add(new ToDoItemView());   // 自定义的TextView
        list.add(new LetterIndexView());    // 字母索引
        list.add(new LottieAnimationViewManager()); // 动画视图
        list.add(new MyReactScrollViewManager());
        return list;
    }
}
