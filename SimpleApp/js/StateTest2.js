import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';


import infoLog from 'infoLog';
const TAG = 'Blink';

/*
 *  状态的变更
 *  setState()方法是执行异步的。所以用得不好就可能出现：组件虽然已经被卸载，但是该方法还在异步调用。
 *  如：setState(...): Can only update a mounted or mounting component. This usually means you called
 *  setState() on an unmounted component. This is a no-op.
 *
 *  组件的状态被子组件的属性引用，当组件状态发生改变时，导致子组件的属性发生改变。
 *  记住一点：内部改状态，外部改属性（）。在组件内部，属性是不可更改的，更改后也不会引起宣染。
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
        infoLog(TAG, "constructor", this.props);
        // 设置状态
        this.state = {showText: true, name: 'CAAC'};
        this.value = 3;
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

    // shouldComponentUpdate() {
    //     infoLog(TAG, "shouldComponentUpdate");
    //     return true;
    // }

    componentWillUpdate() {
        infoLog(TAG, "componentWillUpdate");
    }

    componentDidUpdate() {
        infoLog(TAG, "componentDidUpdate");
    }

    componentWillUnmount() {
        infoLog(TAG, "componentWillUnmount");
    }

    // onPress(display) {
    //     this.props.onClick(display);
    // }

    render() {
        infoLog(TAG, "render------this.props：", this.props, "，this.state：", this.state);
        let display = this.props.text;
        return (
            <Text style={{fontSize: 18, padding: 8}}>{display}</Text>
        );
    }
}


export default class StateTest2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "I love to blink",
        };
    }

    render() {
        return (
            <View>
                <Blink text={this.state.text} name="王军" onPress={()=>{}}/>
                <TouchableOpacity onPress={() => {
                    this.changeText()
                }}><Text style={statestyles.text}>修改</Text></TouchableOpacity>
            </View>
        );
    }

    changeText() {
        let strTemp = globalstyle.getSomeText();
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