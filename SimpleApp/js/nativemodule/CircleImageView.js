'use strict';

/**
 * 原生视图CircleImageView对应的JS模块
 */
import {requireNativeComponent, View} from 'react-native';


/**
 * - src: PropTypes.array,
 * - borderRadius: PropTypes.number,
 * - resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch','repeat','center']),
 */
export var CircleImageView = requireNativeComponent('CircleImageView');

/**
 * 也可以写成
 * module.exports = requireNativeComponent('RCTImageView');
 * 或者
 * var CircleImageView = requireNativeComponent('CircleImageView');
 * module.exports = CircleImageView;
 */