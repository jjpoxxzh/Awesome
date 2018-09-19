import React, {Component} from 'react';
import {
    Animated,
    Easing,
} from 'react-native';


/**
 * 加载时带有淡入动画效果的视图.
 */
export default class FadeInView2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xPosition: new Animated.Value(50),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.xPosition, {
            toValue: 150,
            // easing: Easing.back(),
            duration: 2000,
            delay:2000,
        }).start();
    }

    render() {
        let { xPosition,fadeAnim } = this.state;
        return (
            <Animated.View      // 可动画化的视图组件
                style={{
                    ...this.props.style,    // 样式传递
                    height:xPosition,
                }}
            >{this.props.children}</Animated.View>
        );
    }
}
