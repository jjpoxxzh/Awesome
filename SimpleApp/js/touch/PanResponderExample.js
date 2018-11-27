import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';

var CIRCLE_SIZE = 80;   // 球的直径

/**
 * 随着手指在屏幕上移动而不断移动的小圆球
 */
export default class PanResponderExample extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
    };

    static defaultProps = {	// 默认属性
        title: 'PanResponder Sample',
        description: 'Shows the use of PanResponder to provide basic gesture handling.',
    };

    constructor(props) {
        super(props);
        this.state = {

        };
        this._previousLeft = 0;
        this._previousTop = 0;
        this._circleStyles = {};
        this.circle = null;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            }
        };
    }

    componentDidMount() {
        this._updateNativeStyles();     // 设置初始坐标
    }

    render() {
        return (
            <View
                style={styles.container}>
                <View
                    ref={(circle) => { this.circle = circle }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }

    _highlight() {  // 背景色变为蓝色
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {    // 背景色变为绿色
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        // Should we become active when the user presses down on the circle?
        return true;
    }

    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        // Should we become active when the user moves a touch over the circle?
        return true;
    }

    _handlePanResponderGrant = (e: Object, gestureState: Object) => {
        this._highlight();
    }

    _handlePanResponderMove = (e: Object, gestureState: Object) => {
        console.log(gestureState.dx,gestureState.dy);
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        /**
         * gestureState.dx 表示从触摸操作开始时的累计横向距离，由于此方法会不断调用，则gestureState.dx逐渐累积增大，
         * 通过 this._previousLeft的 不断赋值，使left坐标发生改变
         */
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        this._updateNativeStyles();
    }
    _handlePanResponderEnd = (e: Object, gestureState: Object) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;  // 记录下最后的坐标
        this._previousTop += gestureState.dy;
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
});