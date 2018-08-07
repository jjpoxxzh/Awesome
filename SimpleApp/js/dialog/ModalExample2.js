/**
 * Created by Administrator on 2017/9/5.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import SimpleDialog from './SimpleDialog.js'
import Dialog from './Dialog.js'

const {width, height} = Dimensions.get('window');

/**
 * Modal测试
 */
export default class ModalExample2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
        };
    }

    showDialog() {
        this.setState({dialogVisible: true});
        setTimeout(() => {
            this.hideDialog()
        }, 1000);
    }

    hideDialog() {
        this.setState({dialogVisible: false});
    }

    render() {
        return (
            <View style={modalExampleStyle.container}>

                <SimpleDialog
                    visible={this.state.dialogVisible}
                    text="删除成功"
                />

                <Dialog ref="dialog" callback={() => {
                }}/>

                <View style={{
                    height: 200,
                    borderWidth: 2,
                    borderColor: '#beb',
                    flexDirection: 'column',
                    flexWrap: 'wrap'
                }}>
                    <TouchableHighlight style={modalExampleStyle.button} onPress={() => {
                        this.showDialog(true)
                    }}>
                        <Text>显示对话框</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={modalExampleStyle.button} onPress={() => {
                        this.refs.dialog.show("确定删除吗");
                    }}>
                        <Text>弹框</Text>
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
    text: {
        padding: 3
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