
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
/**
 * 顶部标题栏，使用绝对布局的方式来实现
 * 由于左右两侧操作按钮是绝对布局的，则中间的标题能居中，而不会发生偏移
 */
export default class TopView extends Component {

    static defaultProps = {
        title: '标题',
    };
    static propTypes = {
        title: PropTypes.string,      // 标题
        leftCallback: PropTypes.func,     // 左边操作回调
        rightCallback: PropTypes.func,    // 右边操作回调
    };

    render() {
        return (
            <View style={tts.navBar}>
                <TouchableOpacity style={tts.leftButton} onPress={() => {
                    this.props.leftCallback && this.props.leftCallback()
                }}>
                    <Image style={tts.image}
                           source={require('./img/list.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={tts.titleText}>{this.props.title}</Text>
                <TouchableOpacity style={tts.rightButton} onPress={() => {
                    this.props.rightCallback && this.props.rightCallback()
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
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#efefef'
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
    },
    rightButton: {
        position: 'absolute',
        right: 8,
    },
    image: {
        height: 40,
        width: 40,
    }
});