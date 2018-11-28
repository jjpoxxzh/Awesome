import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';

const TAG = "TouchConflict";

export default class TouchConflict extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
    };

    static defaultProps = {
        title: 'PanResponder Sample',
        description: 'Shows the use of PanResponder to provide basic gesture handling.',
    };

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor1: '#FFFFFF',
            backgroundColor2: '#FFFFFF',
            backgroundColor3: '#FFFFFF',
        };

    }

    componentWillMount() {
        this._panResponder1 = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder1,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder1,
            onPanResponderGrant: this._handlePanResponderGrant1,
            onPanResponderReject: this._handleonPanResponderReject1,
            onPanResponderStart: this._handlePanResponderStart1,
            onPanResponderMove: this._handlePanResponderMove1,
            onPanResponderRelease: this._handlePanResponderEnd1,
            onPanResponderTerminate: this._handlePanResponderEnd1,
            onPanResponderTerminationRequest: this._handleonPanResponderTerminationRequest1,
        });
        this._panResponder2 = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder2,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder2,
            onPanResponderGrant: this._handlePanResponderGrant2,
            onPanResponderReject: this._handleonPanResponderReject2,
            onPanResponderStart: this._handlePanResponderStart2,
            onPanResponderMove: this._handlePanResponderMove2,
            onPanResponderRelease: this._handlePanResponderEnd2,
            onPanResponderTerminate: this._handlePanResponderEnd2,
            onPanResponderTerminationRequest: this._handleonPanResponderTerminationRequest2,
            onStartShouldSetPanResponderCapture: this._handleStartShouldSetPanResponderCapture,
        });
        this._panResponder3 = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder3,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder3,
            onPanResponderGrant: this._handlePanResponderGrant3,
            onPanResponderReject: this._handleonPanResponderReject3,
            onPanResponderStart: this._handlePanResponderStart3,
            onPanResponderMove: this._handlePanResponderMove3,
            onPanResponderRelease: this._handlePanResponderEnd3,
            onPanResponderTerminate: this._handlePanResponderEnd3,
            onPanResponderTerminationRequest: this._handleonPanResponderTerminationRequest3,
        });

    }

    componentDidMount() {

    }

    render() {

        return (
            <View {...this._panResponder1.panHandlers}
                  style={[styles.container1, {backgroundColor: this.state.backgroundColor1}]}>
                <View {...this._panResponder2.panHandlers}
                      style={[styles.container2, {backgroundColor: this.state.backgroundColor2}]}>
                    <View {...this._panResponder3.panHandlers}
                          style={[styles.container3, {backgroundColor: this.state.backgroundColor3}]}/>
                </View>
            </View>
        );
    }

    // 手势1
    _handleStartShouldSetPanResponder1 = (e, gestureState) => {
        return true;
    }
    _handleMoveShouldSetPanResponder1 = (e, gestureState) => {
        return true;
    }

    _handlePanResponderGrant1 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderGrant1");
    }
    _handleonPanResponderReject1 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderReject1");
    }

    _handlePanResponderStart1 = (e, gestureState) => {
        this.setState({backgroundColor1: '#FFAC69'});
    }

    _handlePanResponderMove1 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderMove1");
    }
    _handlePanResponderEnd1 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderEnd1");
        this.setState({backgroundColor1: '#FFFFFF'});
    }
    _handleonPanResponderTerminationRequest1 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderTerminationRequest1");
        return false;
    }

    // 手势2
    _handleStartShouldSetPanResponder2 = (e, gestureState) => {
        return true;
    }
    _handleMoveShouldSetPanResponder2 = (e, gestureState) => {
        return true;
    }

    _handlePanResponderGrant2 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderGrant2");
    }
    _handleonPanResponderReject2 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderReject2");
    }

    _handlePanResponderStart2 = (e, gestureState) => {
        this.setState({backgroundColor2: '#F08176'});
    }
    _handlePanResponderMove2 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderMove2");
    }
    _handlePanResponderEnd2 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderEnd2");
        this.setState({backgroundColor2: '#FFFFFF'});
    }
    _handleonPanResponderTerminationRequest2 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderTerminationRequest2");
        return false;
    }
    _handleStartShouldSetPanResponderCapture= (e, gestureState) => {
        console.log(TAG, "_handleStartShouldSetPanResponderCapture");
        return true;
    }
    // 手势3
    _handleStartShouldSetPanResponder3 = (e, gestureState) => {
        return true;
    }
    _handleMoveShouldSetPanResponder3 = (e, gestureState) => {
        return true;
    }

    _handlePanResponderGrant3 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderGrant3");
    }
    _handleonPanResponderReject3 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderReject3");
    }
    _handlePanResponderStart3 = (e, gestureState) => {
        this.setState({backgroundColor3: '#6CCBC7'});
    }
    _handlePanResponderMove3 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderMove3");
    }
    _handlePanResponderEnd3 = (e, gestureState) => {
        console.log(TAG, "_handlePanResponderEnd3");
        this.setState({backgroundColor3: '#FFFFFF'});
    }
    _handleonPanResponderTerminationRequest3 = (e, gestureState) => {
        console.log(TAG, "_handleonPanResponderTerminationRequest3");
        return false;
    }
};

var styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFAC69',
        borderWidth: 2,
    },
    container2: {
        width: 200,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F08176',
        borderWidth: 2,
    },
    container3: {
        width: 100,
        height: 200,
        borderColor: '#6CCBC7',
        borderWidth: 2,
    },
});