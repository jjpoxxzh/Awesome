import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import BackgroundText from './BackgroundText';

import { observer, inject } from 'mobx-react';



/**
 * Mobx修改状态与通过setState略有不同。它会自动判断状态与上次是否相同，相同时不会引起render，不相同才render
 * 
 */
@inject('fooStore')
@observer
export default class LifeCycleMobxTest extends Component {

    constructor(props) {
        super(props);
        this.store = props.fooStore;
    }

    render() {
        const {
            text
        } = this.props.fooStore;
        return (
            <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                <BackgroundText text={text} />
                <TouchableOpacity style={{
                    marginTop: 30, padding: 20, backgroundColor: 'rgba(0,0,255,1)',
                }}
                    onPress={() => {
                        this.store.changeText();
                    }}>
                    <Text style={statestyles.text}>切换文本</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const statestyles = {
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontSize: 30,
    },
};