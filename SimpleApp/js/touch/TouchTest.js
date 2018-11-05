/**
 * PanResponder：可以将多点触摸操作协调成一个手势。它使得一个单点触摸可以接受更多的触摸操作，也可以用于识别简单的多点触摸手势。
 * onStartShouldSetPanResponder：用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递。
 * onMoveShouldSetPanResponder：在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
 * onPanResponderGrant：开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
 * onPanResponderMove：最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
 * onPanResponderRelease：用户放开了所有的触摸点，且此时视图已经成为了响应者。
 * onPanResponderTerminate：另一个组件已经成为了新的响应者，所以当前手势将被取消。
 *
 */

import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    PanResponder,
} from 'react-native';

import infoLog from 'infoLog';

const { width, height } = Dimensions.get('window');


var _previousLeft = 0;  // 当前的x坐标
var _previousTop = 0;   // 当前的y坐标
var lastLeft = 0;   // 上次的x坐标
var lastTop = 0;    // 上次的y坐标
const CIRCLE_SIZE = 60;

const TAG = "MenuBall";

/**
 * 悬浮拖拽小球
 */
export default class TouchTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                backgroundColor: 'blue',
            },
            yPosition: new Animated.Value(150),
        };
        this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
        this.onPanResponderMove = this.onPanResponderMove.bind(this);
        this.onPanResponderEnd = this.onPanResponderEnd.bind(this);
    }

    //用户开始触摸屏幕的时候，是否愿意成为响应者；
    onStartShouldSetPanResponder(evt, gestureState) {
        return true;
    }

    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState) {
        return true;
    }

    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant(evt, gestureState) {
        console.log('onPanResponderGrant')
        this.setState({
            style: {
                backgroundColor: 'red',
                left: _previousLeft,
                top: _previousTop,
            }
        });
    }

    // 最近一次的移动距离为gestureState.move{X,Y}
    onPanResponderMove(evt, gestureState) {
        console.log('onPanResponderMove', 'x: ' + gestureState.dx, 'y:' + gestureState.dy)
        // 记录下当前的位置
        _previousLeft = gestureState.dx;
        _previousTop = gestureState.dy;

        let value = this.state.yPosition + _previousTop;
        // 更新球的位置
        this.setState({
            style: {
                backgroundColor: 'red',
                left: _previousLeft,
                top: _previousTop,
            },
        });
        Animated.timing(this.state.yPosition, {     // 高度增加到150
            toValue: value,
            duration: 200,
            delay: 0,
        }).start();
    }

    /**
     * 用户放开了所有的触摸点，且此时视图已经成为了响应者。一般来说这意味着一个手势操作已经成功完成。
     * @param evt
     * @param gestureState
     */
    onPanResponderEnd(evt, gestureState) {
        console.log('onPanResponderEnd')
        // 记录下手放开时的位置
        lastLeft = _previousLeft;   // x轴方向中在放手后一定会靠左或者靠右，故此语句实际意义不大；但y方向的有必要
        lastTop = _previousTop;
        this.changePosition();
    }

    /**
     * 根据位置做出相应处理(在x轴方向靠左或者靠右)
     */
    changePosition() {
        if (_previousLeft + CIRCLE_SIZE / 2 <= width / 2) {    // 左边
            _previousLeft = lastLeft = 0;   // 置x方向坐标为0，即紧贴左边
            this.setState({
                style: {
                    left: _previousLeft,
                    top: _previousTop,
                }
            });
        } else {    // 右边
            _previousLeft = lastLeft = width - CIRCLE_SIZE; // 紧贴右边
            this.setState({
                style: {
                    left: _previousLeft,
                    top: _previousTop,
                }
            });
        }
    }

    componentWillMount(evt, gestureState) {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderEnd,
            onPanResponderTerminate: this.onPanResponderEnd,
        });
    }

    render() {
        return (
            <View
                {...this._panResponder.panHandlers}
                style={[styles.container]}>
                <Animated.View style={{
                    width: width, height: this.state.yPosition, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bebebe'
                }}>
                    <Text>下拉刷新</Text>
                </Animated.View>
                <View style={{ width: width, height: height, backgroundColor: '#FFAC69' }}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});