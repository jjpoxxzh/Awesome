import React, { Component } from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import BackgroundText from './BackgroundText';


/*
 * 组件的状态被子组件的属性引用，当组件状态发生改变时，导致子组件的属性发生改变。
 * 
 * 记住一点：内部改状态，外部改属性。
 * 内部改状态是指在组件内部，通过setState()来修改状态(在组件内部，属性是不可更改的，更改后也不会引起宣染)
 * 而在组件外部，如平级组件或父组件，通过更改设置给组件的属性，可达到给组件传递数据并刷新组件的目的。
 * 但到底要如何实现对应属性的修改，不一定要在父组件再增加一个状态，普通的变量即可实现。
 * 
 * setState()方法是执行异步的。所以用得不好就可能出现：组件虽然已经被卸载，但是该方法还在异步调用。
 * 如：setState(...): Can only update a mounted or mounting component. This usually means you called
 * setState() on an unmounted component. This is a no-op.
 *  
 */

export default class LifeCycleTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "中华人民共和国",
        };
    }

    render() {
        return (
            <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                <BackgroundText text={this.state.text} />
                <TouchableOpacity style={{
                    marginTop: 30, padding: 20, backgroundColor: 'rgba(0,0,255,1)',
                }}
                    onPress={() => {
                        this.changeText()
                    }}>
                    <Text style={statestyles.text}>切换文本</Text>
                </TouchableOpacity>
            </View>
        );
    }

    changeText() {
        let value = parseInt(Math.random() * 10);
        let strTemp = "";
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                strTemp = "警察";
                break;
            case 4:
            case 5:
            case 6:
                strTemp = "小偷";
                break;
            case 7:
            case 8:
            case 9:
                strTemp = "猎人";
                break;
        }
        this.setState({
            text: strTemp,
        });
        // 默认情况下，setState会引导视图的渲染，即使是新设置的值与旧的值相同
    }

}


const statestyles = {
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontSize: 30,

    },
};