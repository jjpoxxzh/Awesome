import React, { Component } from 'react';
import {
    Animated,
    Easing,
} from 'react-native';


/**
 * 加载时带有淡入动画效果的视图.
 */
export default class ScaleView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xPosition: new Animated.Value(150),
            yPosition: new Animated.Value(50),
        };
    }

    componentDidMount() {
        // Animated.timing(this.state.yPosition, {
        //     toValue: 150,
        //     // easing: Easing.back(),
        //     duration: 2000,
        //     delay: 1500,
        // }).start();
        Animated.sequence([
            Animated.timing(this.state.yPosition, {     // 高度增加到150
                toValue: 300,
                // easing: Easing.back(),
                duration: 2000,
                delay: 1000,
            }),
            Animated.timing(this.state.xPosition, {     // 宽度增加到200
                toValue: 200,
                // easing: Easing.back(),
                duration: 2000,
                delay: 500,
            })
        ]).start();
    }

    render() {
        let { yPosition, xPosition } = this.state;
        return (
            <Animated.View      // 可动画化的视图组件
                style={{
                    ...this.props.style,    // 样式传递
                    width: xPosition,
                    height: yPosition,
                }}
            >{this.props.children}</Animated.View>
        );
    }
}
