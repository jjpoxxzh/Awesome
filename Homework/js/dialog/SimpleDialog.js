/**
 * Created by Administrator on 2017/9/5.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get('window');

/**
 * 简单的弹框，在屏幕中心显示，一会而就消失
 */
export default class SimpleDialog extends Component {

    static defaultProps = {
        visible: false,     // 视图是否可见
        text: '看不见我'
    };
    static propTypes = {
        visible: PropTypes.bool,
        text: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                transparent={true}
                onRequestClose={() => {
                }}>
                <View style={mdstyles.container}>
                    <Image style={mdstyles.selectLable} source={require('../img/choice_confirm.png')}/>
                    <Text style={mdstyles.dialogContent}>{this.props.text}</Text>
                </View>
            </Modal>
        );
    }
}

const mdstyles = StyleSheet.create({
    container: {
        width: width * 0.3,
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: width / 2 - (width * 0.3 / 2),     // 居中
        top: height / 2 - (height * 0.2 / 2),
        borderRadius: 8,
        backgroundColor: '#bebebe',
    },
    selectLable: {
        width: 30,
        height: 30,
    },
    dialogContent: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
        marginTop: 10,
    },
});