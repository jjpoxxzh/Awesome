import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import infoLog from 'infoLog';

const TAG = 'BackgroundText';

/**
 * 点击可以改变背景色的组件
 */
export default class BackgroundText extends Component {

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
        // 判断是否有属性变化
        this.isPropsChange = false;
    }

    componentWillMount() {
        infoLog(TAG, "componentWillMount");
    }

    componentDidMount() {
        infoLog(TAG, "componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        infoLog(TAG, "componentWillReceiveProps", nextProps);
        this.isPropsChange = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        infoLog(TAG, "shouldComponentUpdate", nextProps, nextState);
        // 属性与状态不可能同时变更，在某一时刻，只有一种会发生变化。
        if (this.isPropsChange) {     // 属性有变更
            this.isPropsChange = false;
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
        let value = parseInt(Math.random() * 5); // 取[1,5)的随机数
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

