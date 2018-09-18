import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';

var screen = Dimensions.get('window');

/*
 *  第三方的Modal组件
 */
export default class ModalExample3 extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            isDisabled: false,  // 禁用对话框的任何动作响应(打开、关闭、滑动)
            swipeToClose: true,     // 下侧滑出关闭
            sliderValue: 0.3
        };
    }

    onClose() {
        console.log('Modal just closed');
    }

    onOpen() {
        console.log('Modal just openned');
    }

    onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
    }

    renderList() {
        var list = [];

        for (var i = 0; i < 50; i++) {
            list.push(<Text style={m3_styles.text} key={i}>Elem {i}</Text>);
        }

        return list;
    }

    render() {
        var BContent = <Button onPress={() => this.setState({isOpen: false})}
                               style={[m3_styles.btn, m3_styles.btnModal]}>X</Button>;

        return (
            <View style={m3_styles.wrapper}>
                <Button onPress={() => this.refs.modal1.open()} style={m3_styles.btn}>Basic modal</Button>
                <Button onPress={() => this.refs.modal2.open()} style={m3_styles.btn}>Position top</Button>
                <Button onPress={() => this.refs.modal3.open()} style={m3_styles.btn}>Position centered + backdrop +
                    disable</Button>
                <Button onPress={() => this.refs.modal4.open()} style={m3_styles.btn}>Position bottom + backdrop +
                    slider</Button>
                <Button onPress={() => this.setState({isOpen: true})} style={m3_styles.btn}>Backdrop +
                    backdropContent</Button>
                <Button onPress={() => this.refs.modal6.open()} style={m3_styles.btn}>Position bottom +
                    ScrollView</Button>
                <Button onPress={() => this.refs.modal7.open()} style={m3_styles.btn}>Modal with keyboard
                    support</Button>

                <Modal
                    style={[m3_styles.modal, m3_styles.modal1]}
                    ref={"modal1"}  // 引用
                    swipeToClose={this.state.swipeToClose}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}
                    onClosingState={this.onClosingState}>
                    <Text style={m3_styles.text}>Basic modal</Text>
                    <Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})}
                            style={m3_styles.btn}>Disable
                        swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
                </Modal>

                <Modal style={[m3_styles.modal, m3_styles.modal2]} backdrop={false} position={"top"} ref={"modal2"}>
                    <Text style={[m3_styles.text, {color: "white"}]}>Modal on top</Text>
                </Modal>

                <Modal style={[m3_styles.modal, m3_styles.modal3]} position={"center"} ref={"modal3"}
                       isDisabled={this.state.isDisabled}>
                    <Text style={m3_styles.text}>Modal centered</Text>
                    <Button onPress={() => this.setState({isDisabled: !this.state.isDisabled})} style={m3_styles.btn}>Disable
                        ({this.state.isDisabled ? "true" : "false"})</Button>
                </Modal>

                <Modal style={[m3_styles.modal, m3_styles.modal4]} position={"bottom"} ref={"modal4"}>
                    <Text style={m3_styles.text}>Modal on bottom with backdrop</Text>
                    <Slider style={{width: 200}} value={this.state.sliderValue}
                            onValueChange={(value) => this.setState({sliderValue: value})}/>
                </Modal>

                <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})}
                       style={[m3_styles.modal, m3_styles.modal4]} position={"center"} backdropContent={BContent}>
                    <Text style={m3_styles.text}>Modal with backdrop content</Text>
                </Modal>

                <Modal style={[m3_styles.modal, m3_styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
                    <ScrollView>
                        <View style={{width: screen.width, paddingLeft: 10}}>
                            {this.renderList()}
                        </View>
                    </ScrollView>
                </Modal>

                <Modal ref={"modal7"} style={[m3_styles.modal, m3_styles.modal4]} position={"center"}>
                    <View>
                        <TextInput style={{height: 50, width: 200, backgroundColor: '#DDDDDD'}}/>
                    </View>
                </Modal>
            </View>
        );
    }
}

const m3_styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#beb',
    },
    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },
    modal3: {
        height: 300,
        width: 300
    },
    modal4: {
        height: 300
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },
    text: {
        color: "black",
        fontSize: 22
    }
});