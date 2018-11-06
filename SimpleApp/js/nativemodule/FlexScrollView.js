'use strict';


import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 定义描述组件接口的对象 flexScrollView
 * @type 
 */
var flexScrollView = {
    name: 'FlexScrollView',    // name
    propTypes: {    // propTypes
        child: PropTypes.object,
        ...View.propTypes,      // 包含默认的View的属性
    },
};

/**
 * 第一个参数为原生视图的名称，第二个参数是一个描述组件接口的对象
 */
module.exports = requireNativeComponent('FlexScrollView', flexScrollView);