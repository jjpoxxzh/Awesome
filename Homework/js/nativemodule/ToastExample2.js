/**
 * Created by Administrator on 2017/10/13.
 */

'use strict';

/**
 * 与原生模块对应的JS模块，封装规范易懂的形式
 */
import {NativeModules} from 'react-native';

const {ToastExample} = NativeModules;

/**
 * 短提示
 */
export const Short = ToastExample.SHORT;
/**
 * 长提示
 */
export const Long = ToastExample.LONG;

/**
 * 展示一个toast提示
 * @param obj 对象信息，包含要显示的文字
 * @param type int值，表明是长提示还是短提示
 */
export function show(obj, type) {
    ToastExample.show(obj, type)
}

/**
 * 成功与失败的回调
 * @param value 数值
 * @param success
 * @param fail
 */
export function pass(value, success, fail) {
    ToastExample.pass(value, a => success(a), b => fail(b));
}

/**
 * Promise
 * @param type
 * @returns {Promise.<void>}
 */
export async function operate(type,success,fail) {
    let obj = {};
    try {
        var {name, age} = await ToastExample.operate(type);
        obj.code = 1;
        obj.name = name;
        obj.age = age;
        success(obj);
    } catch (e) {
        obj.code = 0;
        obj.msg = e;
        fail(obj);
    }finally{
        // console.log('ToastExample2',obj);
    }
}


/**
 * 发送事件
 */
export function tell() {
    ToastExample.tell();
}