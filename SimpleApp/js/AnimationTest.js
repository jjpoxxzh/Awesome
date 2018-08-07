import React, {Component} from 'react';
import {
    Animated,
    Easing,
    LayoutAnimation,
    Text,
} from 'react-native';

import FadeInView from './FadeInView';

/**
 * 动画实例
 */
export default class AnimationTest extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     fadeAnim: new Animated.Value(0),    // 透明度初始值设置为0
        //     xPosition: 0
        // }
    }

    // componentDidMount() {
    //     // 由全透明到不透明
    //     Animated.timing(
    //         this.state.fadeAnim,    // 动画中的变量值
    //         {
    //             toValue: 1,     // 透明度最终变为1，即完全不透明
    //             duration: 3000,     // 动画持续的时间
    //             useNativeDriver: true
    //         }
    //     ).start();  // 开始执行动画
    //
    //     // Animated.timing(this.state.xPosition,{toValue:10,easing:Easing.back,duration:3000,});
    // }

    render() {
        return (
            <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue', margin: 100}}>
                <Text style={{fontSize: 28, textAlign: 'center'}}>Fading in</Text>
            </FadeInView>
        );
    }
}