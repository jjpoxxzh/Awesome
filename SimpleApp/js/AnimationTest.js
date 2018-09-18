import React, {Component} from 'react';
import {
    Animated,
    Easing,
    LayoutAnimation,
    StyleSheet,
    Text,
    View
} from 'react-native';

import FadeInView from './FadeInView';
import FadeInView2 from './FadeInView2';

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
            <View style={styles.container}>
                <FadeInView style={{
                    width: 250,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'powderblue',
                    borderWidth: 1,
                    borderColor: '#f32e37',
                }}>
                    <Text style={styles.tv}>Fading in</Text>
                </FadeInView>
                <FadeInView2 style={{
                    width: 250,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'powderblue',
                    borderWidth: 1,
                    borderColor: '#f32e37',
                    position: 'absolute',
                    top: 0,
                    left: 50,
                }}>
                    <Text style={styles.tv}>Fading in</Text>
                </FadeInView2>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fade: {},
    tv: {
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});