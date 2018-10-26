'use strict';

/**
 * 原生视图CircleImageView对应的JS模块(使用propType来规范接口定义)
 */
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 定义描述组件接口的对象circleImage
 * @type {{name: string, propTypes: {src: (*), borderRadius: (*), resizeMode: *}}}
 */
var circleImage = {
    name: 'CircleImageView',    // name
    propTypes: {    // propTypes
        src: PropTypes.array,
        borderRadius: PropTypes.number,
        resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch','repeat','center']),
        ...View.propTypes,      // 包含默认的View的属性
    },
};

/**
 * 第一个参数为原生视图的名称，第二个参数是一个描述组件接口的对象
 */
module.exports = requireNativeComponent('CircleImageView', circleImage);