/**
 * Created by Administrator on 2017/10/13.
 */

'use strict';

/**
 * 与原生模块对应的JS模块，未进一步封装，缺点是不好理解，别人并不知道此模块有哪些原生方法可用
 */
import { NativeModules } from 'react-native';


// 原生模块名称，即getName()方法返回的字符串
export default NativeModules.ToastExample;