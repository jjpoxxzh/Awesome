'use strict';

import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

var letter = {
    name: 'LetterIndexView',
    propTypes: {
        ...View.propTypes
    },
};

var RCTLetterIndex = requireNativeComponent('LetterIndexView', letter, {
    nativeOnly: {onChange: true}
});

import React, {Component} from 'react';

class LetterIndex extends Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        // this._onTouchEnd = this._onTouchEnd.bind(this);
    }

    _onChange(event: Event) {
        if (!this.props.onTouchLettersDown || !this.props.onTouchLettersDown) {
            return;
        }
        if (event.nativeEvent.message === 'down') {
            this.props.onTouchLettersDown();
        }else if (event.nativeEvent.message === 'up') {
            this.props.onTouchLettersUp();
        }
    }

    // _onTouchEnd(event: Event) {
    //     if (!this.props.onTouchLettersUp) {
    //         return;
    //     }
    //
    //
    // }

    render() {
        return <RCTLetterIndex
            {...this.props}
            onChange={this._onChange} />
    }
}

LetterIndex.propTypes = {
    onTouchLettersDown: PropTypes.func,
    onTouchLettersUp: PropTypes.func,
};

module.exports = LetterIndex;