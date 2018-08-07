import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * 顶部标题栏，使用绝对布局的方式来实现
 * 由于左右两侧操作按钮是绝对布局的，则中间的标题能居中，而不会发生偏移
 */
export default class TopView extends Component {

    render() {
        return (
            <View style={tts.navBar}>
                <TouchableOpacity style={tts.leftButton} onPress={() => {
                    alert('返回');
                }}>
                    <Image style={tts.image}
                           source={require('./img/back.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={tts.titleText}>绝对布局</Text>
                <TouchableOpacity style={tts.rightButton1} onPress={() => {
                }}>
                    <Image style={tts.image}
                           source={require('./img/search.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity style={tts.rightButton2} onPress={() => {
                    alert('搜索');
                }}>
                    <Image style={tts.image}
                           source={require('./img/search.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const tts = StyleSheet.create({
    navBar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,  //iphone默认是全屏的，此处移到状态栏下方，以露出状态栏
        height: 44,
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        position: 'absolute',
        left: 8,
    },
    titleText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 5,
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        backgroundColor: '#beb'
    },
    rightButton1: {
        position: 'absolute',
        right: 50,
    },
    rightButton2: {
        position: 'absolute',
        right: 8,
    },
    image: {
        height: 40,
        width: 40,
    }
});