/**
 * Created by Administrator on 2017/9/5.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableHighlight,
    View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/**
 * Modal，也称模态窗体，指弹窗必须发生响应才能返回到父窗体。
 */
export default class ModalExample1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible1: false,    // Modal1 状态
            visible2: false,    // Modal2 状态
            visible3: false,    // Modal3 状态
        };
    }

    setVisible1(visible) {
        this.setState({visible1: visible});
    }

    setVisible2(visible) {
        this.setState({visible2: visible});
    }

    setVisible3(visible) {
        this.setState({visible3: visible});
    }

    render() {
        return (
            <View style={modalExampleStyle.container}>
                <Modal
                    style={{backgroundColor: '#beb'}}   // 设置样式是无效的
                    animationType={"none"}  // none 无动画而直接呈现，fade 淡入淡出的动画呈现，slide 从底部滑入
                    transparent={true}     // false 不透明，true透明(透明后可看见背景)
                    visible={this.state.visible1}   // 可见还是不可见
                    onRequestClose={() => {     // 在Android下必须有 onRequestClose 方法
                        alert("Modal has been closed.");
                    }}>

                    <View style={modalExampleStyle.mView1}>
                        <View style={modalExampleStyle.mContent}>
                            <Text style={modalExampleStyle.text}>第一个Modal</Text>
                            <TouchableHighlight onPress={() => {
                                this.setVisible1(!this.state.visible1)
                            }}>
                                <Text style={modalExampleStyle.hide}>隐藏</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.visible2}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}>
                    <View style={modalExampleStyle.mView2}>
                        <View style={modalExampleStyle.mContent}>
                            <Text style={modalExampleStyle.text}>第二个Modal</Text>
                            <TouchableHighlight onPress={() => {
                                this.setVisible2(!this.state.visible2)
                            }}>
                                <Text style={modalExampleStyle.hide}>隐藏</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.visible3}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}>
                    <View style={modalExampleStyle.mView3}>
                        <View style={modalExampleStyle.mContent}>
                            <Text style={modalExampleStyle.text}>第三个Modal</Text>
                            <TouchableOpacity onPress={() => {
                                this.setVisible3(!this.state.visible3)
                            }}>
                                <Text style={modalExampleStyle.hide}>隐藏</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{
                    height: 200,
                    borderWidth: 2,
                    borderColor: '#beb',
                    flexDirection: 'column',
                    flexWrap: 'wrap'
                }}>
                    <TouchableHighlight style={modalExampleStyle.button} onPress={() => {
                        this.setVisible1(true)
                    }}>
                        <Text>显示Modal一</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={modalExampleStyle.button} onPress={() => {
                        this.setVisible2(true)
                    }}>
                        <Text>显示Modal二</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={modalExampleStyle.button} onPress={() => {
                        this.setVisible3(true)
                    }}>
                        <Text>显示Modal三</Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}


const modalExampleStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    mView1: {
        width: width / 2,
        height: height / 2,
        justifyContent: 'center',   // 视图内部的子视图居中
        alignItems: 'center',
        position: 'absolute',   // 视图本身在父视图中绝对定位
        left: width / 4,
        top: height / 4,
        backgroundColor: '#bebebe'
    },

    mContent: {
        flexDirection: 'column',
        backgroundColor: '#beb'
    },
    mView2: {
        width: 300,
        height: 120,
        justifyContent: 'center',   // 视图内部居中
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        top: 400,
        backgroundColor: '#6CCBC7'
    },
    mView3: {
        width: (width * 3) / 4,
        height: (height * 3) / 4,
        justifyContent: 'center',   // 视图内部居中
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#6CCBC7'
    },
    text: {
        padding: 3
    },
    hide: {
        padding: 15,
        backgroundColor: '#FFAC69',
        textAlign: 'center',
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFAC69',
        marginTop: 20,
    },
});