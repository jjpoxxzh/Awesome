
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
    Platform,
} from 'react-native';

const AnimatedImplementation = require('AnimatedImplementation');
const dismissKeyboard = require('dismissKeyboard');
const flattenStyle = require('flattenStyle');
const invariant = require('fbjs/lib/invariant');
const warning = require('fbjs/lib/warning');
const resolveAssetSource = require('resolveAssetSource');

let AndroidScrollView,
    RCTScrollView,
    RCTScrollContentView;

if (Platform.OS === 'android') {
    AndroidScrollView = requireNativeComponent('MyScrollView');
} else if (Platform.OS === 'ios') {
    RCTScrollView = requireNativeComponent('RCTScrollView');
    RCTScrollContentView = requireNativeComponent('RCTScrollContentView', View);
} else {
    RCTScrollView = requireNativeComponent('RCTScrollView');
    RCTScrollContentView = requireNativeComponent('RCTScrollContentView', View);
}

export default class MyScrollView extends Component {

    static propTypes = {
        ...View.propTypes,      // 包含默认的View的属性
    };

    constructor() {
        super();
        this.state = {
            layoutHeight: null,
        };
        this._scrollAnimatedValue = new AnimatedImplementation.Value(0);
        this._scrollAnimatedValueAttachment = null;
        this._stickyHeaderRefs = new Map();
        this._headerLayoutYs = new Map();
    }



    UNSAFE_componentWillMount() {
        this._scrollAnimatedValue = new AnimatedImplementation.Value(this.props.contentOffset ? this.props.contentOffset.y : 0);
        this._scrollAnimatedValue.setOffset(this.props.contentInset ? this.props.contentInset.top : 0);
        this._stickyHeaderRefs = new Map();
        this._headerLayoutYs = new Map();
    }

    componentDidMount() {
        this._updateAnimatedNodeAttachment();
    }

    componentDidUpdate() {
        this._updateAnimatedNodeAttachment();
    }

    componentWillUnmount() {
        if (this._scrollAnimatedValueAttachment) {
            this._scrollAnimatedValueAttachment.detach();
        }
    }

    setNativeProps(props) {
        this._scrollViewRef && this._scrollViewRef.setNativeProps(props);
    }

    /**
     * Returns a reference to the underlying scroll responder, which supports
     * operations like `scrollTo`. All ScrollView-like components should
     * implement this method so that they can be composed while providing access
     * to the underlying scroll responder's methods.
     */
    getScrollResponder() {
        return this;
    }

    getScrollableNode() {
        return ReactNative.findNodeHandle(this._scrollViewRef);
    }

    getInnerViewNode() {
        return ReactNative.findNodeHandle(this._innerViewRef);
    }

    /**
     * Scrolls to a given x, y offset, either immediately or with a smooth animation.
     *
     * Example:
     *
     * `scrollTo({x: 0, y: 0, animated: true})`
     *
     * Note: The weird function signature is due to the fact that, for historical reasons,
     * the function also accepts separate arguments as an alternative to the options object.
     * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
     */
    scrollTo(y, x, animated) {
        if (typeof y === 'number') {
            console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, ' +
                'animated: true})` instead.');
        } else {
            ({ x, y, animated } = y || {});
        }
        this.getScrollResponder().scrollResponderScrollTo(
            { x: x || 0, y: y || 0, animated: animated !== false }
        );
    }

    /**
     * If this is a vertical ScrollView scrolls to the bottom.
     * If this is a horizontal ScrollView scrolls to the right.
     *
     * Use `scrollToEnd({animated: true})` for smooth animated scrolling,
     * `scrollToEnd({animated: false})` for immediate scrolling.
     * If no options are passed, `animated` defaults to true.
     */
    scrollToEnd(options) {
        // Default to true
        const animated = (options && options.animated) !== false;
        this.getScrollResponder().scrollResponderScrollToEnd({
            animated: animated,
        });
    }

    /**
     * Deprecated, use `scrollTo` instead.
     */
    scrollWithoutAnimationTo(y, x) {
        console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
        this.scrollTo({ x, y, animated: false });
    }

    /**
     * Displays the scroll indicators momentarily.
     *
     * @platform ios
     */
    flashScrollIndicators() {
        this.getScrollResponder().scrollResponderFlashScrollIndicators();
    }

    _getKeyForIndex(index, childArray) {
        const child = childArray[index];
        return child && child.key;
    }

    _updateAnimatedNodeAttachment() {
        if (this._scrollAnimatedValueAttachment) {
            this._scrollAnimatedValueAttachment.detach();
        }
        if (this.props.stickyHeaderIndices && this.props.stickyHeaderIndices.length > 0) {
            this._scrollAnimatedValueAttachment = AnimatedImplementation.attachNativeEvent(
                this._scrollViewRef,
                'onScroll',
                [{ nativeEvent: { contentOffset: { y: this._scrollAnimatedValue } } }]
            );
        }
    }

    _setStickyHeaderRef(key, ref) {
        if (ref) {
            this._stickyHeaderRefs.set(key, ref);
        } else {
            this._stickyHeaderRefs.delete(key);
        }
    }

    _onStickyHeaderLayout(index, event, key) {
        if (!this.props.stickyHeaderIndices) {
            return;
        }
        const childArray = React.Children.toArray(this.props.children);
        if (key !== this._getKeyForIndex(index, childArray)) {
            // ignore stale layout update
            return;
        }

        const layoutY = event.nativeEvent.layout.y;
        this._headerLayoutYs.set(key, layoutY);

        const indexOfIndex = this.props.stickyHeaderIndices.indexOf(index);
        const previousHeaderIndex = this.props.stickyHeaderIndices[indexOfIndex - 1];
        if (previousHeaderIndex != null) {
            const previousHeader = this._stickyHeaderRefs.get(
                this._getKeyForIndex(previousHeaderIndex, childArray)
            );
            previousHeader && previousHeader.setNextHeaderY(layoutY);
        }
    }

    _handleScroll(e) {
        if (__DEV__) {
            if (this.props.onScroll && this.props.scrollEventThrottle == null && Platform.OS === 'ios') {
                console.log(
                    'You specified `onScroll` on a <ScrollView> but not ' +
                    '`scrollEventThrottle`. You will only receive one event. ' +
                    'Using `16` you get all the events but be aware that it may ' +
                    'cause frame drops, use a bigger number if you don\'t need as ' +
                    'much precision.'
                );
            }
        }
        if (Platform.OS === 'android') {
            if (this.props.keyboardDismissMode === 'on-drag') {
                dismissKeyboard();
            }
        }
        this.scrollResponderHandleScroll(e);
    }

    _handleLayout(e) {
        if (this.props.invertStickyHeaders) {
            this.setState({ layoutHeight: e.nativeEvent.layout.height });
        }
        if (this.props.onLayout) {
            this.props.onLayout(e);
        }
    }

    _handleContentOnLayout(e) {
        const { width, height } = e.nativeEvent.layout;
        this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
    }

    _scrollViewRef() {

    }

    _setScrollViewRef(ref) {
        this._scrollViewRef = ref;
    }

    _innerViewRef() {

    }
    _setInnerViewRef(ref) {
        this._innerViewRef = ref;
    };

    render() {
        let ScrollViewClass;
        let ScrollContentContainerViewClass;
        if (Platform.OS === 'android') {
            if (this.props.horizontal) {
                ScrollViewClass = AndroidHorizontalScrollView;
                ScrollContentContainerViewClass = AndroidHorizontalScrollContentView;
            } else {
                ScrollViewClass = AndroidScrollView;
                ScrollContentContainerViewClass = View;
            }
        } else {
            ScrollViewClass = RCTScrollView;
            ScrollContentContainerViewClass = RCTScrollContentView;
            warning(
                !this.props.snapToInterval || !this.props.pagingEnabled,
                'snapToInterval is currently ignored when pagingEnabled is true.'
            );
        }

        invariant(
            ScrollViewClass !== undefined,
            'ScrollViewClass must not be undefined'
        );

        invariant(
            ScrollContentContainerViewClass !== undefined,
            'ScrollContentContainerViewClass must not be undefined'
        );

        const contentContainerStyle = [
            this.props.horizontal && styles.contentContainerHorizontal,
            this.props.contentContainerStyle,
        ];
        let style, childLayoutProps;
        if (__DEV__ && this.props.style) {
            style = flattenStyle(this.props.style);
            childLayoutProps = ['alignItems', 'justifyContent']
                .filter((prop) => style && style[prop] !== undefined);
            invariant(
                childLayoutProps.length === 0,
                'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
                ') must be applied through the contentContainerStyle prop.'
            );
        }

        let contentSizeChangeProps = {};
        if (this.props.onContentSizeChange) {
            contentSizeChangeProps = {
                onLayout: this._handleContentOnLayout,
            };
        }

        const { stickyHeaderIndices } = this.props;
        const hasStickyHeaders = stickyHeaderIndices && stickyHeaderIndices.length > 0;
        const childArray = hasStickyHeaders && React.Children.toArray(this.props.children);
        const children = hasStickyHeaders ?
            childArray.map((child, index) => {
                const indexOfIndex = child ? stickyHeaderIndices.indexOf(index) : -1;
                if (indexOfIndex > -1) {
                    const key = child.key;
                    const nextIndex = stickyHeaderIndices[indexOfIndex + 1];
                    return (
                        <ScrollViewStickyHeader
                            key={key}
                            ref={(ref) => this._setStickyHeaderRef(key, ref)}
                            nextHeaderLayoutY={
                                this._headerLayoutYs.get(this._getKeyForIndex(nextIndex, childArray))
                            }
                            onLayout={(event) => this._onStickyHeaderLayout(index, event, key)}
                            scrollAnimatedValue={this._scrollAnimatedValue}
                            inverted={this.props.invertStickyHeaders}
                            scrollViewHeight={this.state.layoutHeight}>
                            {child}
                        </ScrollViewStickyHeader>
                    );
                } else {
                    return child;
                }
            }) :
            this.props.children;
        const contentContainer =
            <ScrollContentContainerViewClass
                {...contentSizeChangeProps}
                ref={this._setInnerViewRef}
                style={contentContainerStyle}
                removeClippedSubviews={
                    // Subview clipping causes issues with sticky headers on Android and
                    // would be hard to fix properly in a performant way.
                    Platform.OS === 'android' && hasStickyHeaders ?
                        false :
                        this.props.removeClippedSubviews
                }
                collapsable={false}>
                {children}
            </ScrollContentContainerViewClass>;

        const alwaysBounceHorizontal =
            this.props.alwaysBounceHorizontal !== undefined ?
                this.props.alwaysBounceHorizontal :
                this.props.horizontal;

        const alwaysBounceVertical =
            this.props.alwaysBounceVertical !== undefined ?
                this.props.alwaysBounceVertical :
                !this.props.horizontal;

        const DEPRECATED_sendUpdatedChildFrames =
            !!this.props.DEPRECATED_sendUpdatedChildFrames;

        const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;
        const props = {
            ...this.props,
            alwaysBounceHorizontal,
            alwaysBounceVertical,
            style: ([baseStyle, this.props.style]: ?Array<any>),
            // Override the onContentSizeChange from props, since this event can
            // bubble up from TextInputs
            onContentSizeChange: null,
            onLayout: this._handleLayout,
            onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
            onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
            onResponderGrant: this.scrollResponderHandleResponderGrant,
            onResponderReject: this.scrollResponderHandleResponderReject,
            onResponderRelease: this.scrollResponderHandleResponderRelease,
            onResponderTerminate: this.scrollResponderHandleTerminate,
            onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
            onScroll: this._handleScroll,
            onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
            onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
            onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
            onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
            onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
            onTouchEnd: this.scrollResponderHandleTouchEnd,
            onTouchMove: this.scrollResponderHandleTouchMove,
            onTouchStart: this.scrollResponderHandleTouchStart,
            onTouchCancel: this.scrollResponderHandleTouchCancel,
            scrollBarThumbImage: resolveAssetSource(this.props.scrollBarThumbImage),
            scrollEventThrottle: hasStickyHeaders ? 1 : this.props.scrollEventThrottle,
            sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ?
                true : false,
            DEPRECATED_sendUpdatedChildFrames,
        };

        const { decelerationRate } = this.props;
        if (decelerationRate) {
            props.decelerationRate = processDecelerationRate(decelerationRate);
        }

        const refreshControl = this.props.refreshControl;

        if (refreshControl) {
            if (Platform.OS === 'ios') {
                // On iOS the RefreshControl is a child of the ScrollView.
                // tvOS lacks native support for RefreshControl, so don't include it in that case
                return (
                    <ScrollViewClass {...props} ref={this._setScrollViewRef}>
                        {Platform.isTVOS ? null : refreshControl}
                        {contentContainer}
                    </ScrollViewClass>
                );
            } else if (Platform.OS === 'android') {
                // On Android wrap the ScrollView with a AndroidSwipeRefreshLayout.
                // Since the ScrollView is wrapped add the style props to the
                // AndroidSwipeRefreshLayout and use flex: 1 for the ScrollView.
                // Note: we should only apply props.style on the wrapper
                // however, the ScrollView still needs the baseStyle to be scrollable

                return React.cloneElement(
                    refreshControl,
                    { style: props.style },
                    <ScrollViewClass {...props} style={baseStyle} ref={this._setScrollViewRef}>
                        {contentContainer}
                    </ScrollViewClass>
                );
            }
        }
        return (
            <ScrollViewClass {...props} ref={this._setScrollViewRef}>
                {contentContainer}
            </ScrollViewClass>
        );
    }
}

const styles = StyleSheet.create({
    baseVertical: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        overflow: 'scroll',
    },
    baseHorizontal: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    contentContainerHorizontal: {
        flexDirection: 'row',
    },
});