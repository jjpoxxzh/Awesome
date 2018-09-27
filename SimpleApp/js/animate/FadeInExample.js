import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import FadeInView from './FadeInView';
import RNTesterButton from './RNTesterButton';

/**
 * 透明度动画
 */
export default class FadeInExample extends Component {

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
                {this.state.show && <FadeInView style={{
                    backgroundColor: 'deepskyblue',
                    borderWidth: 1,
                    borderColor: 'dodgerblue',
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                }}>
                    <Text style={styles.tv}>Fading in</Text>
                </FadeInView>
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