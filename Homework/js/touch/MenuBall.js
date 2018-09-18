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

import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    PanResponder,
} from 'react-native';

import infoLog from 'infoLog';

const {width, height} = Dimensions.get('window');

var _previousLeft = 0;
var _previousTop = 0;
var lastLeft = 0;
var lastTop = 0;
const CIRCLE_SIZE = 60;

const TAG = "MenuBall";

/**
 * 悬浮拖拽小球
 */
export default class MenuBall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                backgroundColor: 'blue',
            },
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
        //infoLog(TAG, 'onPanResponderGrant...');
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
        //infoLog(TAG, gestureState.dx, gestureState.dy);
        _previousLeft = lastLeft + gestureState.dx;
        _previousTop = lastTop + gestureState.dy;

        if (_previousLeft <= 0) {
            _previousLeft = 0;
        }
        if (_previousTop <= 0) {
            _previousTop = 0;
        }
        if (_previousLeft >= width - CIRCLE_SIZE) {
            _previousLeft = width - CIRCLE_SIZE;
        }
        if (_previousTop >= height - CIRCLE_SIZE) {
            _previousTop = height - CIRCLE_SIZE;
        }

        //实时更新
        this.setState({
            style: {
                backgroundColor: 'red',
                left: _previousLeft,
                top: _previousTop,
            }
        });
    }

    /**
     * 用户放开了所有的触摸点，且此时视图已经成为了响应者。一般来说这意味着一个手势操作已经成功完成。
     * @param evt
     * @param gestureState
     */
    onPanResponderEnd(evt, gestureState) {
        lastLeft = _previousLeft;
        lastTop = _previousTop;
        this.changePosition();
    }

    /**
     * 根据位置做出相应处理
     */
    changePosition() {
        if (_previousLeft + CIRCLE_SIZE / 2 <= width / 2) {    // 左边
            _previousLeft = lastLeft = 0;
            this.setState({
                style: {
                    left: _previousLeft,
                    top: _previousTop,
                }
            });
        } else {    // 右边
            _previousLeft = lastLeft = width - CIRCLE_SIZE;
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
        /**
         * 三个点其实就是对象的扩展运算符，说白了就是把panHandlers对象里面所有的属性填充到View中。
         * 通过源码我们也可以知道View中其实定义了一系列
         * propTypes: {
         * ……
         *  onResponderGrant: PropTypes.func,
         *  onResponderMove: PropTypes.func,
         *  onResponderTerminationRequest: PropTypes.func,
         *  onStartShouldSetResponder: PropTypes.func,
         *  }
         *  
         */
        return (
            <View
                {...this._panResponder.panHandlers}
                style={[mbstyles.circle, this.state.style]}/>
        );
    }
}

const mbstyles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: 'blue',
        position: 'absolute',
    }
});