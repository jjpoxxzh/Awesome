'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    ActivityIndicator,
    Dimensions,
    Text,
    AsyncStorage,
    Image,
    ImageBackground,
    UIManager,
    // ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

// RN自带的ScrollView会导致下拉不灵活，按往下拉时没问题，手碰触式下拉很不灵活，故修改了原生的的ScrollView代替
import ScrollView from './nativemodule/PlantfromScrollView';

const deviceWidth = Dimensions.get('window').width;

const REFRESH_LAST_TIME_KEY = "refresh_last";   // 存储最后刷新时间的Key

const ShowLoadingStatus = {
    SHOW_DOWN: 0,   // 正常
    SHOW_UP: 1,     // 准备
    SHOW_LOADING: 2,    // 刷新
};

const TAG = 'PullToRefresh1';

/**
 * 弹性头：图片背景，有下拉刷新文字
 */
export default class PullToRefresh1 extends Component {

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
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,    // 展示加载状态
            showPullLastTime: 'NONE',
        };
        this.headerFlag = false;    // 只有ScrollView确实弹性拖动了，才调用重置头的方法
        this.isTopFlag = true;  // ScrollView是否滚动到顶
        this.isEndFlag = false;     // ScrollView是否滚动到底
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
        AsyncStorage.getItem(REFRESH_LAST_TIME_KEY, (err, result) => {
            if (result) {
                this.setState({
                    showPullLastTime: result,
                });
            }
        });
    }

    render() {
        const { headHeight, backgroundSource } = this.props;
        let pullText;
        let indicatorView;
        if (this.state.showPullStatus === ShowLoadingStatus.SHOW_DOWN) {
            indicatorView = <Image style={styles.arrow}
                source={require('./img/ptr_rotate_arrow.png')}
                resizeMode={'contain'}
            />;
            pullText = "下拉刷新";
        } else if (this.state.showPullStatus === ShowLoadingStatus.SHOW_UP) {

            indicatorView = <Image style={[styles.arrow, { transform: [{ rotate: "180deg" }] }]}
                source={require('./img/ptr_rotate_arrow.png')}
                resizeMode={'contain'}
            />;
            pullText = "释放刷新";
        } else if (this.state.showPullStatus === ShowLoadingStatus.SHOW_LOADING) {
            indicatorView = <ActivityIndicator style={styles.arrow} size="small" color="#00ff00" />;
            pullText = "刷新中…";
        }
        return (
            <ScrollView
                onMomentumScrollEnd={this._contentViewScroll.bind(this)}
                onScrollEndDrag={this._contentViewScroll.bind(this)}
                bounces={false}
                style={styles.base} >
                <ImageBackground style={{ width: deviceWidth }}
                    resizeMode={'stretch'}
                    source={backgroundSource}
                    ref={(header) => { this.header = header }}>
                    <View style={{
                        height: headHeight,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {indicatorView}
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                        }}>
                            <Text style={{ fontSize: 12, color: '#666', marginBottom: 1 }}>{pullText}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: '#666',
                                marginTop: 1
                            }}>最后更新: {this.state.showPullLastTime}</Text>
                        </View>
                    </View>
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
            if (this.headerStyles.style.height > headHeight + baseHeight) {
                this.setState({
                    showPullStatus: ShowLoadingStatus.SHOW_UP,
                });
            } else {
                this.setState({
                    showPullStatus: ShowLoadingStatus.SHOW_DOWN,
                });
            }
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
        this.setState({
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,
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
        this.setState({
            showPullStatus: ShowLoadingStatus.SHOW_LOADING,
        }, () => {
            if (onRefresh) {
                onRefresh();
            }
        });
    }


    addZeroAtFront(count) {
        if (count < 10) {
            count = "0" + count;
        }
        return count;
    }


    getTime() {
        let date = new Date();
        let mMonth = this.addZeroAtFront(date.getMonth() + 1);
        let mDate = this.addZeroAtFront(date.getDate());
        let mHours = this.addZeroAtFront(date.getHours());
        let mMinutes = this.addZeroAtFront(date.getMinutes());
        return mMonth + "-" + mDate + "  " + mHours + ":" + mMinutes;
    }

    stopRefresh() {
        console.log(TAG, 'stopRefresh');
        let savedDate = this.getTime();
        this.setState({
            showPullLastTime: savedDate,
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,
        });
        AsyncStorage.setItem(REFRESH_LAST_TIME_KEY, savedDate, () => {

        });
    }

    _contentViewScroll(e) {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        let m1 = Math.ceil(offsetY + oriageScrollHeight);
        let m2 = parseInt(contentSizeHeight, 10);
        console.log(TAG, offsetY, contentSizeHeight, oriageScrollHeight);
        // console.log(TAG, m1, m2);
        if (m1 >= m2) {
            this.isEndFlag = true;
            this.isTopFlag = false;
            console.log(TAG, '滑动到底部')
        } else {
            this.isEndFlag = false;
            if (offsetY <= 0) {
                this.isTopFlag = true;
                console.log(TAG, '滑动到顶部')
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