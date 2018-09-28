'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Animated,
} from 'react-native';

import PropTypes from 'prop-types';
/**
 * BlurView temporarily removed until semver stuff is set up properly
 */
//var BlurView /* = require('react-native-blur').BlurView */;
var screen = Dimensions.get('window');
var ScrollViewPropTypes = ScrollView.propTypes;

/**
 * 由ScrollView修改的弹性视图
 */
export default class ParallaxView extends Component {

    static propTypes = {
        ...ScrollViewPropTypes,
        windowHeight: PropTypes.number,
        backgroundSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number,
        ]),
        header: PropTypes.node,
        blur: PropTypes.string,
        contentInset: PropTypes.object,
    };

    static defaultProps = {
        windowHeight: 300,
        contentInset: {
            top: screen.scale
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0), // Y轴方向滚动的距离，初始值设为0
        };
    }

    /**
     * IMPORTANT: You must return the scroll responder of the underlying
     * scrollable component from getScrollResponder() when using ScrollableMixin.
     */
    getScrollResponder() {
        return this._scrollView.getScrollResponder();
    }

    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    }

    // 以下3个方法来自于ScrollableMixin，如果在本身不需要提供滚动方法给外部调用，可直接删除这3个方法以及上面的2个方法
    getInnerViewNode() {
        return this.getScrollResponder().getInnerViewNode();
    }

    scrollTo(destY, destX) {
        this.getScrollResponder().scrollTo({ x: destY, y: destX, animated: true });
    }

    scrollWithoutAnimationTo(destY, destX) {
        this.getScrollResponder().scrollWithoutAnimationTo(destY, destX);
    }

    renderBackground() {
        var { windowHeight, backgroundSource, blur } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.Image
                style={[styles.background, {
                    height: windowHeight,
                    transform: [
                        {
                            /*
                            * 高度(translateY)随着 scrollY 变化而变化
                            * 下拉到 windowHeight 时高度增加1/2，回到初始距离时高度不变，
                            * 上拉到 windowHeight 时高度减小为原来的1/3
                            */
                            translateY: scrollY.interpolate({
                                inputRange: [-windowHeight, 0, windowHeight],
                                outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                            })
                        },
                        {
                            /*
                            * 大小(scale)随着 scrollY 变化而变化
                            * 下拉到 windowHeight 时为2，回到初始距离时为1，
                            * 上拉超到 windowHeight 时为1
                            */
                            scale: scrollY.interpolate({
                                inputRange: [-windowHeight, 0, windowHeight],
                                outputRange: [2, 1, 1]
                            })
                        }
                    ]
                }]}
                source={backgroundSource}>
                {/*
                    !!blur && (BlurView || (BlurView = require('react-native-blur').BlurView)) &&
                    <BlurView blurType={blur} style={styles.blur} />
                */}
            </Animated.Image>
        );
    }

    renderHeader() {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.View style={{
                position: 'relative',
                height: windowHeight,
                borderWidth: 4, borderColor: '#6CCBC7',
                /*
                * 透明度(opacity)随scrollY变化而变化
                * 下拉到 windowHeight 时不透明，回到初始距离时不透明，上拉超过一半多时全透明
                */
                opacity: scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight / 1.2],
                    outputRange: [1, 1, 0]
                }),
            }}>
                {this.props.header}
            </Animated.View>
        );
    }

    render() {
        var { style, ...props } = this.props;
        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                <ScrollView
                    ref={component => { this._scrollView = component; }}
                    {...props}
                    style={styles.scrollView}
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )
                        // 下拉时，y为负，垂直偏移量逐渐增大；上拉时，y为正，垂直偏移量逐渐增大
                    }
                // onScroll={(event) => { console.log('TEST', event.nativeEvent); }}
                >
                    {this.renderHeader()}
                    <View style={[styles.content, props.scrollableViewStyle]}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#2e2f31',
        width: screen.width,
        resizeMode: 'cover',
        borderWidth: 1, borderColor: '#FFAC69',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    blur: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderWidth: 1, borderColor: '#f32e37',
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }
});
