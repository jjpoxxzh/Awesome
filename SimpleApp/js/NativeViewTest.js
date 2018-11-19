import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    Dimensions,
    ToastAndroid,
    View
} from 'react-native';

var screen = Dimensions.get("window");
// 原生圆角视图
import { CircleImageView } from './nativemodule/CircleImageView';
// 原生TextView视图
import { TodoItem } from './nativemodule/ToDoItem';

const images1 = [{ uri: 'http://www.w3school.com.cn/ui2017/logo-96.png' }];
const images2 = [
    { uri: 'http://www.w3school.com.cn/i/eg_bg_03.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_04.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_05.gif', width: 100.0, height: 100.0 },
    { uri: 'http://www.w3school.com.cn/i/eg_bg_06.gif', width: 100.0, height: 100.0 }
];


/**
 * 调用原生模块
 * 原生模块对应的JS模块ToastExample没有定义具体的方法，这会使其他人不知道这个模块具体有哪些方法，只能去看原生代码
 */
export default class NativeViewTest extends Component {

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
                <CircleImageView style={{ width: 150, height: 150 }}
                    src={images1} borderRadius={5}
                    resizeMode="cover" />
                <TodoItem style={{ width: screen.width, height: 50 }}
                    text="中华人民共和国" textSize={22} isAlpha={false}
                    onChangeMessage={() => {
                        this.touch();
                    }}
                    onLongClickMessage={() => {
                        this.longTest();
                    }}
                />
            </View>
        );
    }

    /**
     * 原生组件的触屏事件，原生向JS发送事件通知
     */
    touch() {
        // alert("你触摸了我");
        ToastAndroid.show('你触碰到我了', ToastAndroid.SHORT);
    }

    longTest() {
        // alert("你长时间按着我不放想干什么？");
        ToastAndroid.show('你长时间按着我不放想干什么？', ToastAndroid.SHORT);
    }
}