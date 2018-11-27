
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CIRCLE_SIZE = 60;

const TAG = "SuspendedBall";

/**
 * 随手指移动的小球，根据小球最后位置在屏幕哪边而停靠在哪个边缘处
 */
export default class SuspendedBall extends Component {

    constructor(props) {
        super(props);
        this._previousLeft = 20;    // 当前位置
        this._previousTop = 80;
        this.lastLeft = 0;      // 初始位置及最终位置
        this.lastTop = 0;
        this.state = {
            style: {
                left: this._previousLeft,
                top: this._previousLeft,
                backgroundColor: 'blue',
            },
        };

    }

    componentWillMount() {
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
            <View style={styles.container}>
                <View style={{ flex: 1, height: height, backgroundColor: 'black' }} />
                <View style={{ flex: 1, height: height, backgroundColor: 'white' }} />
                <View
                    style={[styles.circle,this.state.style]}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }

    // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者
    onStartShouldSetPanResponder = (evt, gestureState) => {
        return true;
    }

    // 如果 View 不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢
    onMoveShouldSetPanResponder = (evt, gestureState) => {
        return true;
    }

    // View 现在要开始响应触摸事件了。可以给用户一些视觉反馈，让户知道他到底点到了哪里
    onPanResponderGrant = (evt, gestureState) => {
        console.log(TAG, 'onPanResponderGrant')
        this.setState({
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'red',
            }
        });
        // 记录下初始位置
        this.lastLeft = this._previousLeft;
        this.lastTop = this._previousTop;
    }

    // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
    onPanResponderMove = (evt, gestureState) => {
        console.log('onPanResponderMove', gestureState.dx, gestureState.dy);

        // 记录下当前的位置
        this._previousLeft = this.lastLeft + gestureState.dx;
        this._previousTop = this.lastTop + gestureState.dy;
        // 只能在屏幕区域内，不能超出屏幕区域
        if (this._previousLeft <= 0) {
            this._previousLeft = 0;
        } else if (this._previousLeft >= width - CIRCLE_SIZE) {
            this._previousLeft = width - CIRCLE_SIZE;
        }
        if (this._previousTop <= 0) {
            this._previousTop = 0;
        } else if (this._previousTop >= height - CIRCLE_SIZE) {
            this._previousTop = height - CIRCLE_SIZE;
        }
        // 更新球的位置
        this.setState({
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'red',
            }
        });
    }

    /**
     * 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
     */
    onPanResponderEnd = (evt, gestureState) => {
        console.log('onPanResponderEnd')
        // 根据位置做出相应处理(在x轴方向靠左或者靠右)
        if (this._previousLeft + CIRCLE_SIZE / 2 <= width / 2) {    // 左边
            this._previousLeft = 0;   // 置x方向坐标为0，即紧贴左边
        } else {    // 右边
            this._previousLeft = lastLeft = width - CIRCLE_SIZE; // 紧贴右边
        }
        this.setState({
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            }
        });
        // 记录下最终位置
        this.lastLeft = this._previousLeft;
        this.lastTop = this._previousTop;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: 'blue',
        position: 'absolute',
    }
});