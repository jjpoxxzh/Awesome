'use strict';


// import {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 自定义的原生CircleImageView对应的JS模块
 * @type {{name: string, propTypes: {src: (*), borderRadius: (*), resizeMode: *}}}
 */
var circleImage = {
    name: 'CircleImageView',
    propTypes: {
        src: PropTypes.array,
        borderRadius: PropTypes.number,
        resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch','repeat','center']),
        ...View.propTypes,      // 包含默认的View的属性
    },
};

module.exports = requireNativeComponent('CircleImageView', circleImage);