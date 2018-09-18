/**
 * Created by Administrator on 2018/1/11.
 */

'use strict';


// import {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

var todoItem = {
    name: 'ToDoItemView',
    propTypes: {
        text: PropTypes.string,
        textSize: PropTypes.number,
        textColor: PropTypes.number,
        isAlpha: PropTypes.bool,
        ...View.propTypes
    },
};

var RCTTodoItem = requireNativeComponent('ToDoItemView', todoItem ,{
    nativeOnly: {onChange: true}
});

import React, {Component} from 'react';

/**
 * 自定义的原生TextView对应的JS模块TodoItem
 */
class TodoItem extends Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event: Event) {
        if (!this.props.onChangeMessage) {
            return;
        }
        if (event.nativeEvent.message === 'MyMessage') {
            this.props.onChangeMessage();
            return;
        }
    }

    render() {
        return <RCTTodoItem
            {...this.props}
            onChange={this._onChange}/>
    }
}

TodoItem.propTypes = {
    onChangeMessage: PropTypes.func,
}

module.exports = TodoItem;