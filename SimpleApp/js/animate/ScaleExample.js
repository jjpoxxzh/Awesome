import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScaleView from './ScaleView';
import RNTesterButton from './RNTesterButton';

/**
 * 动画实例
 */
export default class ScaleExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    render() {
        return (

            <View style={styles.container}>
                <RNTesterButton onPress={() => {
                    this.setState((state) => (
                        { show: !state.show }
                    ));
                }}>
                    Press to {this.state.show ? 'Hide' : 'Show'}
                </RNTesterButton>
                {this.state.show &&
                    <ScaleView style={{
                        width: 150,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'deepskyblue',
                        borderWidth: 1,
                        borderColor: 'dodgerblue',
                        margin: 20,
                        borderRadius: 10,
                        position: 'absolute',
                        top: 0,
                        left: 50,
                    }}>
                        <Text style={styles.tv}>Fading in</Text>
                    </ScaleView>
                }
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
    tv: {
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});