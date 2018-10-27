/**
 * Created by Administrator on 2017/10/13.
 */
import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    NativeModules,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import * as globalConfig from './styleconfig';

import ToastExample from './nativemodule/ToastExample';
import ImageExample from './nativemodule/ImageExample';
// 原生圆角视图
import CircleImageView from './nativemodule/CircleImageView';
// 原生TextView视图
import TodoItem from './nativemodule/ToDoItem';

const images1 = [{ uri: 'http://www.w3school.com.cn/ui2017/logo-96.png' }];
const images2 = [
    { uri: 'http://www.w3school.com.cn/i/eg_bg_03.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_04.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_05.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_06.gif', width: 100.0, height: 100.0 }
];


class Item extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onclick}
                style={{
                    flex: 1,
                    backgroundColor: this.props.bgcolor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}><Text style={{ fontSize: 20 }}>{this.props.text}</Text></TouchableOpacity>
        );
    }
}


/**
 * 调用原生模块
 * 原生模块对应的JS模块ToastExample没有定义具体的方法，这会使其他人不知道这个模块具体有哪些方法，只能去看原生代码
 */
export default class NativeTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item2_text: props.text2,
            item2_bg_color: 'skyblue',
        };
    }

    componentWillMount() {
        this.eventemit = DeviceEventEmitter.addListener("hello", function (e) {
            alert(JSON.stringify(e));
        });
    }

    componentWillUnmount() {
        this.eventemit.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}>
                    <Item text="原生方法——常规调用" onclick={() => {
                        this.toast();
                    }} bgcolor="powderblue" />
                    <Item text="原生方法——Callback" onclick={() => {
                        this.callback();
                    }} bgcolor={this.state.item2_bg_color} />
                    <Item text="原生方法——Promise" onclick={() => {
                        this.start();
                    }} bgcolor="steelblue" />
                    <Item text="原生方法——通知" onclick={() => {
                        this.tellToNative();
                    }} bgcolor={globalConfig.color_1} />
                    <Item text="调用系统相册获取一张图片" onclick={() => {
                        this.getImageFromGallery();
                    }} bgcolor={globalConfig.color_2} />

                </View>
                <CircleImageView style={{ width: 150, height: 150 }}
                    src={images1} borderRadius={5}
                    resizeMode="cover" />
                <TodoItem style={{ width: globalConfig.screen.width, height: 50 }}
                 text="中华人民共和国" textSize={22} isAlpha={false}
                 onChangeMessage={() => {
                        this.doSomething();
                    }} />

            </View>
        );
    }

    /**
     * JS传入数据，交由对应的原生模块进行Toast显示
     */
    toast() {
        let arr = {
            message: '我是一个原生的Toast',
            size: 1,
            flag: true
        };
        ToastExample.show(arr, ToastExample.SHORT);
        // 如果不引入ToastExample文件，而直接引用NativeModules
        // NativeModules.ToastExample.show(arr,NativeModules.ToastExample.SHORT);
    }

    /**
     * JS传数据给原生方法，由它去执行具体的逻辑，成功或失败则调用不同的回市方法，将结果传递给JS
     */
    callback() {
        let value = parseInt(Math.random() * 10 + 1); // 取[1,10)的随机数
        ToastExample.pass(value, a => {
            this.success(a)
        }, (b) => {
            this.fail(b)
        });
    }

    success(value) {
        this.setState({
            item2_bg_color: globalConfig.color_1,
        });
        alert("成功");
    }

    fail(value) {
        this.setState({
            item2_bg_color: "skyblue",
        });
        alert("失败");
    }

    /**
     * 用Promise来代替Callback的方式，可以简化部分代码，比如原来有多个callback，现在一个Promise就可以实现
     * @returns {Promise.<void>}
     */
    async start() {
        try {
            var { name, age } = await ToastExample.operate(7);
            console.log("name:" + name + ',age:' + age);
        } catch (e) {
            // 红屏异常
            console.warn(e);
        }
    }


    /**
     * 原生向JS发送事件通知，JS需要注册此事件
     */
    tellToNative() {
        ToastExample.tell();
    }

    getImageFromGallery() {
        ImageExample.pickImage()
            .then(msg => {
                // alert("图片路径为：" + msg);
                console.log("图片路径为：" + msg)
            })
            .catch(err => {
                // alert(err);
                console.log("遇到错误：" + err);
            });
    }

    /**
     * 原生组件的触屏事件，原生向JS发送事件通知
     */
    doSomething() {
        alert("你触摸了我");
    }
}