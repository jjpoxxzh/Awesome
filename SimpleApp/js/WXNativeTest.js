/**
 * 微信登录、分享
 */
import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import PT from 'prop-types';

import {color_1, color_2, screen} from './styleconfig';

import * as WeChat from './nativemodule/weixin';
WeChat.registerApp('wxc4d47d3d98bad159');
import ImageExample from './nativemodule/ImageExample';

const images1 = [{uri: 'http://www.w3school.com.cn/ui2017/logo-96.png'}];
const images2 = [
    {uri: 'http://www.w3school.com.cn/i/eg_bg_03.gif', width: 100.0, height: 100.0},
    {uri: 'http://www.w3school.com.cn/i/eg_bg_04.gif', width: 100.0, height: 100.0},
    {uri: 'http://www.w3school.com.cn/i/eg_bg_05.gif', width: 100.0, height: 100.0},
    {uri: 'http://www.w3school.com.cn/i/eg_bg_06.gif', width: 100.0, height: 100.0}
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
                              }}><Text style={{fontSize: 20}}>{this.props.text}</Text></TouchableOpacity>
        );
    }
}


/**
 * 调用原生模块
 * 原生模块对应的JS模块ToastExample定义了具体的方法，使用者一目了然，这是标准做法
 */
export default class WXNativeTest extends Component {

    static defaultProps = {
        text1: "原生方法",
        text2: "原生方法——Callback",
        text3: "原生方法——Promise",
        text4: "原生方法——通知",
    };
    static propTypes = {
        text2: PT.string.isRequired,
    };

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
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}>
                    <Item text="分享文字" onclick={() => {
                        this.shareText();
                    }} bgcolor="powderblue"/>
                    <Item text="分享图片url" onclick={() => {
                        this.shareImageUrl();
                    }} bgcolor="skyblue"/>
                    <Item text="原生方法——Promise" onclick={() => {

                    }} bgcolor="steelblue"/>
                    <Item text="原生方法——通知" onclick={() => {

                    }} bgcolor={color_1}/>
                    <Item text="从startActivityForResult中获取结果" onclick={() => {

                    }} bgcolor={color_2}/>

                </View>
            </View>
        );
    }

    /**
     * JS传入数据，交由对应的原生模块进行Toast显示
     */
    async shareText() {
        try {
            let result = await
            WeChat.shareToTimeline({
                type: 'text',
                description: 'hello, wechat'
            });
            console.log('share text message to time line successful:', result);
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        }
    }

    async shareImageUrl(){
        try {
            let result = await WeChat.shareToTimeline({
                type: 'imageUrl',
                title: 'web image',
                description: 'share web image to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: 'https://img.dsimg.cn/goods/201806/BCTRN2Q0AMY6.png'
            });
            console.log('share image url to time line successful:', result);
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                // throw e;
                console.warn(e);
            }
        }
    }

}