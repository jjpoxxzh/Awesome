'use strict';

import React, {Component} from 'react';
import {
    requireNativeComponent,
} from 'react-native';

import PropTypes from 'prop-types';

class LetterIndex extends Component {

    static propTypes = {
        onTouchLettersDown: PropTypes.func,
        onTouchLettersUp: PropTypes.func,
    };

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
        } else if (event.nativeEvent.message === 'up') {
            this.props.onTouchLettersUp();
        }
    }

    // _onTouchEnd(event: Event) {
    //     if (!this.props.onTouchLettersUp) {
    //         return;
    //     }
    // }

    render() {
        return <RCTLetterIndex
            {...this.props}
            onChange={this._onChange}/>
    }
}

export var RCTLetterIndex = requireNativeComponent('LetterIndexView', LetterIndex, {
    nativeOnly: {onChange: true}
});

// module.exports = LetterIndex;

