import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

const screen = Dimensions.get('window');
/**
 * 按钮组件
 */
export default class RNTesterButton extends Component {

    static propTypes = {
        onPress: PropTypes.func,
    };
    static defaultProps = {
        onPress: () => { }
    };

    render() {
        const { onPress, children } = this.props;
        return (
            <TouchableHighlight
                onPress={onPress}
                style={styles.button}
                underlayColor="grey">
                <Text>
                    {children}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        borderColor: '#696969',
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
    },
});
