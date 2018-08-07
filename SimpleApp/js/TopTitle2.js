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
 * 顶部标题栏，使用相对布局的样式
 * 存在的问题：如果左右操作按钮的宽度不一样，会使中间的标题栏发生偏移，而不能居中对齐
 */
export default class TopView2 extends Component {

    render() {
        return (
            <View style={tts.navBar}>
                <TouchableOpacity style={tts.leftButton} onPress={() => {
                    alert('返回');
                }}>
                    <Image style={tts.image}
                           source={require('./img/back.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={tts.titleText}>默认的布局</Text>
                <View style={tts.right}>
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
            </View>
        );
    }
}

const tts = StyleSheet.create({
    navBar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,  //iphone默认是全屏的，必须移到状态栏下方
        height: 44,
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    leftButton: {
        backgroundColor: '#beb'
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
    right: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#beb'
    },
    image: {
        height: 40,
        width: 40,
    }
});