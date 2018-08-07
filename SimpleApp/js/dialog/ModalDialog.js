/**
 * Created by Administrator on 2017/9/5.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ModalDialog extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        _dialogTitle: PropTypes.string, //标题
        _dialogContent: PropTypes.string, //内容
        _dialogLeftBtnTitle: PropTypes.string,    //左按键标题
        _dialogRightBtnTitle: PropTypes.string,   //右按键标题
        _dialogLeftBtnAction: PropTypes.func.isRequired,  //左点击方法
        _dialogRightBtnAction: PropTypes.func.isRequired, //右点击方法
        _dialogVisible: PropTypes.bool,       //显示还是隐藏
    }

    static defaultProps = {
        _dialogTitle: '温馨提示',
        _dialogContent: '是否退出',
        _dialogLeftBtnTitle: '取消',
        _dialogRightBtnTitle: '确定',
        _dialogVisible: false,
    }

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        return (
            // Modal在Android下必须有onRequestClose方法
            <Modal
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => {
                }}>
                <View style={mdstyles.bg}>
                    <View style={mdstyles.dialog}>
                        <View style={mdstyles.dialogTitleView}>
                            <Text style={mdstyles.dialogTitle}>
                                {this.props._dialogTitle}
                            </Text>
                        </View>
                        <View style={mdstyles.dialogContentView}>
                            <Text style={mdstyles.dialogContent}>
                                {this.props._dialogContent}
                            </Text>
                        </View>
                        <View style={mdstyles.dialogBtnView}>
                            <TouchableHighlight style={mdstyles.dialogBtnViewItem}
                                                onPress={this.props._dialogLeftBtnAction}>
                                <Text style={mdstyles.leftButton}>
                                    {this.props._dialogLeftBtnTitle}
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={mdstyles.dialogBtnViewItem}
                                                onPress={this.props._dialogRightBtnAction}>
                                <Text style={mdstyles.rightButton}>
                                    {this.props._dialogRightBtnTitle}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mdstyles = StyleSheet.create({
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.28,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dialogTitleView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    dialogContentView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContent: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
    },
    dialogBtnView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        flexDirection: 'row',
    },
    dialogBtnViewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5F2FF',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    leftButton: {
        fontSize: 18,
        color: '#007AFF',
        borderBottomLeftRadius: 8,
    },
    rightButton: {
        fontSize: 18,
        color: '#007AFF',
        borderBottomRightRadius: 8,
    }
});