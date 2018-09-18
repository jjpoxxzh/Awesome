import React, {Component} from 'react';
import {
    Animated,
    Easing,
} from 'react-native';


/**
 * 加载时带有淡入动画效果的视图.
 */
export default class FadeInView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,    // 动画中的变量值
            {
                toValue: 1,     // 透明度最终变为1，即完全不透明
                duration: 1500,     // 动画持续的时间
                easing: Easing.back(),
                useNativeDriver: true,      // 启用原生驱动
            }
        ).start();
    }

    render() {
        let {fadeAnim} = this.state;
        return (
            <Animated.View      // 可动画化的视图组件
                style={{
                    ...this.props.style,    // 样式传递
                    opacity: fadeAnim,   // 将透明度opacity指定为变量值，则会由0变为1，即全透明变成不透明
                }}
            >{this.props.children}</Animated.View>
        );
    }
}
