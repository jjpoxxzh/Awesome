/**
 * 一些通用的方法
 */
import React, {Component} from 'react';
import {
  PixelRatio,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const basePx = 375;

function dp1(px) {
  return px * width / basePx
}

function dp2(px) {
  return px * width / basePx;
}

function dp3(px) {
  return px * width / basePx;
}

export {width as deviceWidth, height as devideHeight, dp1, dp2, dp3};
