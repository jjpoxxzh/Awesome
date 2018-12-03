'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    Dimensions,
    ImageBackground,
    UIManager,
    // ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

// RN自带的ScrollView会导致下拉不灵活，按往下拉时没问题，手碰触式下拉很不灵活，故修改了原生的的ScrollView代替
import ScrollView from './nativemodule/ScrollView';

const deviceWidth = Dimensions.get('window').width;

const TAG = 'PullToRefresh3';
/**
 * 弹性头，无下拉刷新文字
 */
export default class PullToRefresh3 extends Component {

    static propTypes = {
        factor: PropTypes.number,   // 下拉阻力系数
        backTime: PropTypes.number,     // 视图返回时的动画持续时间
        headHeight: PropTypes.number,   // header高度
        baseHeight: PropTypes.number,   // 下拉到此高度需要执行一些状态变化
        onRefresh: PropTypes.func,  // 刷新中的
        backgroundSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            PropTypes.number,
        ]),     // 头部的背景图
    };

    static defaultProps = {
        factor: 1.8,
        backTime: 200,
        headHeight: 100,
        baseHeight: 80,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
        this.headerFlag = false;    // 只有ScrollView确实弹性拖动了，才调用重置头的方法
        this.isTopFlag = true;  // ScrollView是否滚动到顶
        // 要在Android上使用此动画，则需要在代码中启用
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillMount() {
        const { headHeight } = this.props;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this.headerStyles = {
            style: {
                height: headHeight,
            }
        };
    }

    componentDidMount() {
        this._updateNativeStyles();
    }

    render() {
        const { headHeight, backgroundSource } = this.props;
        return (
            <ScrollView
                onMomentumScrollEnd={this._contentViewScroll.bind(this)}
                onScrollEndDrag={this._contentViewScroll.bind(this)}
                style={styles.base} >
                <ImageBackground style={{ width: deviceWidth }}
                    resizeMode={'stretch'}
                    source={backgroundSource}
                    ref={(header) => { this.header = header }}>
                    <View style={{
                        height: headHeight,

                        justifyContent: 'center',
                        alignItems: 'center',
                    }} />
                </ImageBackground>
                <View
                    style={{ flex: 1, }}  {...this._panResponder.panHandlers} >
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }

    _handleStartShouldSetPanResponder = (e, gestureState) => true

    _handleMoveShouldSetPanResponder = (e, gestureState) => true

    _handlePanResponderGrant = (e, gestureState) => {
        // console.log(TAG, "_handlePanResponderGrant");
    }

    _handlePanResponderMove = (e, gestureState) => {
        // console.log(TAG, "_handlePanResponderMove");
        const { factor, headHeight, baseHeight } = this.props;
        let deltaY = gestureState.dy / factor;
        this.headerStyles.style.height = headHeight + deltaY;
        // console.log(TAG, deltaY, this.headerStyles.style.height);
        this.headerFlag = false;
        if (this.isTopFlag && (deltaY >= 0)) {
            this._updateNativeStyles();
            this.headerFlag = true;
        }
    }

    _handlePanResponderEnd = (e, gestureState) => {
        // console.log(TAG, "_handlePanResponderEnd");
        const { headHeight, baseHeight } = this.props;
        if (this.headerFlag) {
            if (this.headerStyles.style.height >= headHeight + baseHeight) {    // 如果超过基准高度
                this.refreshStateHeader();
            } else {    // 未超过基准高度
                this.resetHeader();
            }
        }
    }

    _updateNativeStyles() {
        this.header && this.header.setNativeProps(this.headerStyles);
    }

    // 加载完成，从基准点回到0；或者从小于基准高度的距离回到0
    resetHeader() {
        console.log(TAG, 'resetHeader');
        const { backTime, headHeight } = this.props;
        this.headerStyles.style.height = headHeight;
        this._updateNativeStyles();
        LayoutAnimation.configureNext({
            duration: backTime,
            update: {
                type: 'linear',
            }
        });
    }

    // 从大于基准高度的距离回到基准高度，进行加载操作
    refreshStateHeader() {
        console.log(TAG, 'refreshStateHeader');
        const { backTime, headHeight, onRefresh } = this.props;
        this.headerStyles.style.height = headHeight;
        this._updateNativeStyles();
        LayoutAnimation.configureNext({
            duration: backTime * 1.5,
            update: {
                type: 'linear',
            }
        });
        // if (onRefresh) {
        //     onRefresh();
        // }
    }

    stopRefresh() {
        console.log(TAG, 'stopRefresh');
    }

    _contentViewScroll(e) {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        let m1 = Math.ceil(offsetY + oriageScrollHeight);
        let m2 = parseInt(contentSizeHeight, 10);
        // console.log(TAG, offsetY, contentSizeHeight, oriageScrollHeight);
        console.log(TAG, m1, m2, offsetY);
        if (m1 >= m2) {
            this.isTopFlag = false;
            console.log(TAG, '滑动到底部')
        } else {
            if (offsetY <= 0) {
                this.isTopFlag = true;
                console.log(TAG, '滑动到顶部')
            }else{
                this.isTopFlag = false;
            }
        }
    }

}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    arrow: {
        height: 30,
        width: 30,
    },

});