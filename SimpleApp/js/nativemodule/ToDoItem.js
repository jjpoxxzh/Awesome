/**
 * 自定义的原生TextView对应的JS模块TodoItem
 * Created by Administrator on 2018/1/11.
 */

'use strict';

import React, {Component} from 'react';
import {
    requireNativeComponent,
    View
} from 'react-native';
import PropTypes from 'prop-types';

// 第一个参数为原生视图的名称，第二个参数为封装后的组件MyCustomView
var RCTToDoItemView = requireNativeComponent('ToDoItemView2', TodoItem);

// 把原生组件封装成普通的React组件，即TodoItem
export default class TodoItem extends Component {

    static propTypes = {
        onChangeMessage: PropTypes.func,
        onLongClickMessage: PropTypes.func,
        text: PropTypes.string,
        textSize: PropTypes.number,
        textColor: PropTypes.number,
        isAlpha: PropTypes.bool,
        ...View.propTypes
    };

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event: Event) {
        if (!this.props.onChangeMessage) {
            return;
        }
        console.log('TodoItem',event.nativeEvent.message);
        if (event.nativeEvent.message === 'Touch') {
            this.props.onChangeMessage && this.props.onChangeMessage();
        } else if (event.nativeEvent.message === 'LongClick') {
            this.props.onLongClickMessage && this.props.onLongClickMessage();
        }
    }

    render() {
        return <RCTToDoItemView
            {...this.props}
            onChange={this._onChange}/>
    }
}
