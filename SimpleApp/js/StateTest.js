import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import infoLog from 'infoLog';
const TAG = 'Blink';
import {getSomeText} from './styleconfig';

/*
 *  组件的状态被子组件的属性引用，当组件状态发生改变时，导致子组件的属性发生改变。
 *  记住一点：内部改状态，外部改属性。内部改状态是指在组件内部，通过setState()来修改状态(在组件内部，属性是不可更改的，更改后也不会引起宣染)；
 *  而在组件外部，如平级组件或父组件，通过更改设置给组件的属性，可达到给组件传递数据并刷新组件的目的。
 *  但到底要如何实现对应属性的修改，不一定要在父组件再增加一个状态，普通的变量即可实现。
 *  。
 */
class Blink extends Component {

    static defaultProps = {	// 默认属性
        autoPlay: false,
        maxLoops: 10,
    };  // 注意这里有分号
    static propTypes = {	// 属性类型
        autoPlay: PropTypes.bool.isRequired,
        maxLoops: PropTypes.number.isRequired,
    };  // 注意这里有分号


    //构造方法
    constructor(props) {

        super(props);
        // 设置状态
        this.state = {
            showText: true,     // 是否显示文字
            name: 'CAAC'
        };
        // 每10秒对showText状态做一次取反操作
        setInterval(() => {
            // previousState表示当前的state
            this.setState(previousState => {
                infoLog(TAG, "当前state", previousState, "，修改state");
                return {showText: !previousState.showText};
            });
        }, 10000);
    }

    componentWillMount() {
        infoLog(TAG, "componentWillMount");
    }

    componentDidMount() {
        infoLog(TAG, "componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        infoLog(TAG, "componentWillReceiveProps------nextProps：", nextProps);
    }

    shouldComponentUpdate() {
        infoLog(TAG, "shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        infoLog(TAG, "componentWillUpdate");
    }

    componentDidUpdate() {
        infoLog(TAG, "componentDidUpdate");
    }

    componentWillUnmount() {
        infoLog(TAG, "componentWillUnmount");
    }


    render() {
        infoLog(TAG, "render------this.props：", this.props, "，this.state：", this.state);
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text style={{fontSize: 18, padding: 8}} ref="abc">{display}</Text>
        );
    }
}


export default class StateTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "I love to blink",
        };
    }

    render() {
        return (
            <View>
                <Blink text={this.state.text} name="王军" onPress={() => {
                }}/>
                <TouchableOpacity onPress={() => {
                    this.changeText()
                }}><Text style={statestyles.text}>修改</Text></TouchableOpacity>
                {/*<Blink text='Yes blinking is so great'/>
                 <Blink text='Why did they ever take this out of HTML'/>
                 <Blink text='Look at me look at me look at me'/>*/}
            </View>
        );
    }

    changeText() {
        let strTemp = getSomeText();
        infoLog("StateTest", "修改state，即修改子组件的text属性---");
        this.setState({
            text: strTemp,
        });
    }
}


const statestyles = {
    text: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ffffff',
        fontSize: 30,
        backgroundColor: '#f32e37',
    },
};