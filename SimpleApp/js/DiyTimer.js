import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 计时器组件，用于倒计时读数
 * 一个完整的组件的写法
 */
export default class DiyTimer extends Component {

    static defaultProps = {	// 默认属性
        time: 60,   // 倒计时读秒时间默认为60秒
        text: '计时中',    // 计时中的文字
        endText: '启动倒计时',   // 计时结束时的文字
        isRunning: false,   // 初始状态，true表示计时中，false表示计时结束
    };  // 注意这里有分号
    static propTypes = {	// 属性类型
        time: PropTypes.number.isRequired,
        text: PropTypes.string,
        endText: PropTypes.string,
        isRunning: PropTypes.bool.isRequired,
    };  // 注意这里有分号

    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time,
            disabled: this.props.isRunning,
        };
        this._countdown = this._countdown.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    componentWillMount() {
        if (this.state.disabled) {
            this._countdown();
        }
    }

    _onPress() {
        if (this.state.disabled) {  // 计时中
            //nothing
        } else {    // 计时结束再重新开计时
            this.setState({disabled: true, time: this.props.time});
            this._countdown();
            this.props.onStart && this.props.onStart();
        }
    }

    _countdown() {
        this.timer = setInterval(() => {
            var time = this.state.time - 1;
            this.setState({time: time});
            if (time <= 0) {
                this.setState({disabled: false,});
                // this.setState({disabled: false,time: this.props.time ? this.props.time : 60});
                clearInterval(this.timer);  // 清理定时器
                this.props.onEnd && this.props.onEnd();
            }
        }, 1000);
    }


    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        if (this.state.disabled) {
            return (
                <View style={cstyles.container}>
                    <TouchableHighlight>
                        <Text style={{color: '#fff'}}>{this.props.text} {this.state.time}</Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableHighlight
                        style={cstyles.container}
                        onPress={this._onPress.bind(this)}>
                        <Text style={{color: '#fff'}}>{this.props.endText}</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }
}

const cstyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 100,
        height: 40,
        backgroundColor: '#ed7b66',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
});