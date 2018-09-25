import React, { Component } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';

import RNTesterButton from './animate/RNTesterButton';
import { BoxShadow } from 'react-native-shadow';

/**
 * 缩放、平移、旋转动画
 */
export default class ShadowTest extends Component {

    constructor(props) {
        super(props);
        this.anim = this.anim || new Animated.Value(0);
    }

    render() {
        const shadowOpt = {
            width: 250,
            height: 250,
            color: '#000',
            border: 30,
            radius: 0,
            opacity: 0.15,
            x: 0,
            y: 5,
            style: {
                marginVertical: 25
            }
        };
        return (
            <View style={styles.container}>
                <RNTesterButton onPress={() => { }}>
                    Press to Fling it!
              </RNTesterButton>
                <BoxShadow setting={shadowOpt}>
                    <TouchableHighlight style={styles.box}>
                        <Text>中华人民共和国</Text>
                    </TouchableHighlight>
                </BoxShadow>

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
    box: {
        // position: 'relative',
        // marginLeft: 20,
        // marginRight: 20,
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderWidth: 1,
        // overflow: 'hidden',
    },

});