import React, { Component } from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import infoLog from 'infoLog';
const TAG = 'BgText';


/*
 * 组件的状态被子组件的属性引用，当组件状态发生改变时，导致子组件的属性发生改变。
 * 
 * 记住一点：内部改状态，外部改属性。
 * 内部改状态是指在组件内部，通过setState()来修改状态(在组件内部，属性是不可更改的，更改后也不会引起宣染)
 * 而在组件外部，如平级组件或父组件，通过更改设置给组件的属性，可达到给组件传递数据并刷新组件的目的。
 * 但到底要如何实现对应属性的修改，不一定要在父组件再增加一个状态，普通的变量即可实现。
 *  
 */
class BgText extends Component {

    static propTypes = {	// 属性类型
        text: PropTypes.string,
    };  // 注意这里有分号

    static defaultProps = {	// 默认属性
        text: '中华人民共和国',
    };  // 注意这里有分号

    constructor(props) {
        super(props);
        this.state = {
            bgColor: '#000000',
        };
        this.colors = ['#FFAC69', '#F08176', '#6CCBC7', '#CD8CC0', '#6FA9CE'];
        this.isColorChange = false;
    }

    componentWillMount() {
        infoLog(TAG, "componentWillMount");
    }

    componentDidMount() {
        infoLog(TAG, "componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        infoLog(TAG, "componentWillReceiveProps", nextProps);
        this.isColorChange = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        infoLog(TAG, "shouldComponentUpdate", nextProps, nextState);
        if (this.isColorChange) {     // 属性有变更
            this.isColorChange = false;
            if (nextProps.text === this.props.text) {
                infoLog(TAG, "文本内容与上次相同，不更新属性")
                return false;
            } else {
                return true;
            }
        } else {   // 状态有变更
            if (nextState.bgColor === this.state.bgColor) {
                infoLog(TAG, "背景颜色与上次相同，不更新状态")
                return false;
            }
            return true;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        infoLog(TAG, "componentWillUpdate");
    }

    componentDidUpdate(prevProps, prevState) {
        infoLog(TAG, "componentDidUpdate");
    }

    componentWillUnmount() {
        infoLog(TAG, "componentWillUnmount");
    }

    changeBgcolor() {
        let value = parseInt(Math.random() * 5); // 取[1,6)的随机数
        this.setState({
            bgColor: this.colors[value],
        });
    }

    render() {
        infoLog(TAG, "render------this.props：", this.props, "，this.state：", this.state);

        const {
            text
        } = this.props;

        return (
            <TouchableOpacity style={{
                width: 300, height: 150, justifyContent: 'center', alignItems: 'center',
                backgroundColor: this.state.bgColor
            }}
                onPress={() => {
                    this.changeBgcolor();
                }}
            >
                <Text style={{ fontSize: 22, padding: 8, color: '#FFFFFF', fontWeight: 'bold' }} >{text}</Text>
            </TouchableOpacity>

        );
    }
}


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
                <BgText text={this.state.text} />
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