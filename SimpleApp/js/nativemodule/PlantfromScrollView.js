'use strict'

import {
    ScrollView,
    Platform,
} from 'react-native';

import AndroidScrollView from './ScrollView'

if (Platform.OS === 'android') {
    module.exports = AndroidScrollView;
} else {
    module.exports = ScrollView;
}