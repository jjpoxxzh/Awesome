import React, { Component } from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import { observer, inject } from 'mobx-react';

import Foo from './store'

import infoLog from 'infoLog';

const TAG = 'BgText';


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


@inject('Foo')
@observer
export default class LifeCycleMobxTest extends Component {

    constructor(props) {
        super(props);
        this.store = props.Foo;
    }

    render() {
        const {
            text
        } = this.props.Foo;
        return (
            <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                <BgText text={text} />
                <TouchableOpacity style={{
                    marginTop: 30, padding: 20, backgroundColor: 'rgba(0,0,255,1)',
                }}
                    onPress={() => {
                        this.store.changeText()
                    }}>
                    <Text style={statestyles.text}>切换文本</Text>
                </TouchableOpacity>
            </View>
        );
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