/**
 * Created by Administrator on 2018/11/6.
 * 链接：https://www.jianshu.com/p/9a4151852722
 */
'use strict'

import React, { Component } from 'react';
import {
    InteractionManager,
    ScrollView,
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    ProgressBarAndroid,
    ActivityIndicator,
    Dimensions,
    Text,
    AsyncStorage,
    Image,
    ImageBackground,
    UIManager,
} from 'react-native';

let self;
/**ref的引用*/
const PULL_REFRESH_LAYOUT = "pullLayout";
/**屏幕宽度*/
const deviceWidth = Dimensions.get('window').width;
/**下拉阻力系数*/
const factor = 1.8;
/**最大下拉高度*/
const MAX_PULL_LENGTH = 170;
/**Loading的高度*/
const REFRESH_PULL_LENGTH = 70;
/**动画时长*/
const BACK_TIME = 200;
/**存储最后刷新时间的Key*/
const REFRESH_LAST_TIME_KEY = "refresh_last";

const RefreshStatus = {
    Refresh_NONE: 0,    // 未下拉
    Refresh_Drag_Down: 1,   // 下拉(到标准点或最大值都算是)
    Refresh_Loading: 2,     // 加载中
    Refresh_Reset: 3,   // 加载完毕后重置
};

const ShowLoadingStatus = {
    SHOW_DOWN: 0,   // 下拉
    SHOW_UP: 1,     // 达到基准点
    SHOW_LOADING: 2,    // 加载中
};

const TAG = 'PullToRefreshLayout2';

// 要在Android上使用此动画，则需要在代码中启用
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PullToRefreshLayout2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDistance: 0,     // 当前移动的距离，值为手势下移的距离除阻止因子
            pullRefreshStatus: RefreshStatus.Refresh_NONE,  // 展示下拉状态
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,    // 展示加载状态
            showPullLastTime: 'NONE',
        };
        this.resetHeader = this.resetHeader.bind(this);
        this.refreshStateHeader = this.refreshStateHeader.bind(this);
        this.getTime = this.getTime.bind(this);
        this.addZeroAtFront = this.addZeroAtFront.bind(this);
        this._panResponder = {};
    }

    //要求成为响应者
    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    //touch down 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    _handlePanResponderGrant(e: Object, gestureState: Object) {

    }

    //touch move 响应滑动事件
    _handlePanResponderMove(e: Object, gestureState: Object) {
        if (self.state.currentDistance > REFRESH_PULL_LENGTH) { // 下拉到基准点
            if (self.state.showPullStatus === ShowLoadingStatus.SHOW_DOWN) {    // 改变状态
                self.setState({
                    showPullStatus: ShowLoadingStatus.SHOW_UP,
                });
            }
        } else {    // 未下拉到基准点
            if (self.state.showPullStatus === ShowLoadingStatus.SHOW_UP) {  // 如果状态不对，则修改为下拉状态
                self.setState({
                    showPullStatus: ShowLoadingStatus.SHOW_DOWN,
                });
            }
        }
        if (self.state.pullRefreshStatus === RefreshStatus.Refresh_Loading) {
            self.setState({
                currentDistance: REFRESH_PULL_LENGTH + gestureState.dy / factor,
                // refreshStateHeader:2,
            });
            // 
            self.refs['header'].setNativeProps({
                style: {
                    height: self.state.currentDistance,
                }
            });

            return;
        }
        if (gestureState.dy > 0) {
            self.setState({
                currentDistance: gestureState.dy / factor,
                pullRefreshStatus: RefreshStatus.Refresh_Drag_Down,
            });
            self.refs['header'].setNativeProps({
                style: {
                    height: REFRESH_PULL_LENGTH + self.state.currentDistance,
                }
            });
        }
    }

    _handlePanResponderEnd(e: Object, gestureState: Object) {
        if (self.state.currentDistance >= REFRESH_PULL_LENGTH) {    // 如果超过基准高度
            self.refreshStateHeader();
        } else {    // 未超过基准高度
            self.resetHeader();
        }
    }

    // 加载完成，从基准点回到0；或者从小于基准高度的距离回到0
    resetHeader() {
        console.log(TAG, 'resetHeader');
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear',
            }
        });
        self.refs['header'].setNativeProps({
            style: {
                height: REFRESH_PULL_LENGTH,
            }
        });
        self.setState({
            currentDistance: 0,
            pullRefreshStatus: RefreshStatus.Refresh_Reset,
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,
        });
    }

    // 从大于基准高度的距离回到基准高度，进行加载操作
    refreshStateHeader() {
        console.log(TAG, 'refreshStateHeader');
        self.setState({
            pullRefreshStatus: RefreshStatus.Refresh_Loading,
            currentDistance: REFRESH_PULL_LENGTH,
            showPullStatus: ShowLoadingStatus.SHOW_LOADING,
        }, () => {
            if (self.props.onRefresh) {
                self.props.onRefresh();
            }
        });
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear',
            }
        });
        self.refs['header'].setNativeProps({
            style: {
                height: REFRESH_PULL_LENGTH,
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
        let savedDate = this.getTime();
        self.setState({
            showPullLastTime: savedDate,
            currentDistance: 0,
            pullRefreshStatus: RefreshStatus.Refresh_Reset,
            showPullStatus: ShowLoadingStatus.SHOW_DOWN,
        });
        AsyncStorage.setItem(REFRESH_LAST_TIME_KEY, savedDate, () => {

        });
        // this.resetHeader();
    }

    componentDidMount() {
        AsyncStorage.getItem(REFRESH_LAST_TIME_KEY, (err, result) => {
            if (result) {
                self.setState({
                    showPullLastTime: result,
                });
            }
        });
    }

    componentWillMount() {
        self = this;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.showPullStatus !== self.state.showPullStatus) {
            return true;
        }
        if (self.state.showPullLastTime !== nextState.showPullLastTime) {
            return true;
        }
        return false;
    }

    render() {
        let pullText;
        let indicatorView;
        if (this.state.showPullStatus === ShowLoadingStatus.SHOW_DOWN) {    // 触屏下拉
            indicatorView = <Image
                style={{ height: 30, width: 30, marginRight: 10 }}
                source={require('./img/ptr_rotate_arrow.png')}
                resizeMode={'contain'}
            />;
            pullText = "下拉刷新";
        } else if (this.state.showPullStatus === ShowLoadingStatus.SHOW_UP) {   // 达到基准点后
            indicatorView = <Image
                style={{ height: 30, width: 30, marginRight: 10, transform: [{ rotate: "180deg" }] }}
                source={require('./img/ptr_rotate_arrow.png')}
                resizeMode={'contain'}
            />;
            pullText = "释放刷新";
        } else if (this.state.showPullStatus === ShowLoadingStatus.SHOW_LOADING) {  // 放手进入刷新中
            indicatorView = <ActivityIndicator size="small" color="#00ff00" />;
            pullText = "刷新中......";
        }
        return (
            <View style={styles.base}>
                <ImageBackground style={{ width: deviceWidth }} resizeMode={'stretch'}
                    source={require('./img/header.png')} ref={'header'}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: deviceWidth,
                        height: REFRESH_PULL_LENGTH,
                        flexDirection: 'row'
                    }}>
                        {indicatorView}
                        <View style={{
                            height: REFRESH_PULL_LENGTH,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10
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
                    ref={PULL_REFRESH_LAYOUT}
                    style={{ flex: 1, }}  {...this._panResponder.panHandlers} >
                    {this.props.children}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    base: {
        flex: 1,
        position: 'relative',
        borderWidth: 1, borderColor: '#f32e37'
    },
});