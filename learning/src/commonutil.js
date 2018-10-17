"use strict";


var plateNumberRegex = /^([\u4e00-\u9fa5][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|^[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1}$/,
  mobilephoneRegex = /^1[3|4|5|8][0-9]\d{4,8}$/;

/***********************************************************************
 *                           校验工具类                                *
 *                     调用方式：validateUtil.方法名                   *
 * ********************************************************************/
var validateutil = {

  /**
   * 校验车牌号
   * 使用方法：validateUtil.plateNumber(number)
   * @param {string} 车牌号
   * @return {boolean} 车牌号符合规范
   */
  plateNumber: function (number) {
    return plateNumberRegex.test(number);
  },

  /**
   * 校验手机号
   * 使用方法：validateUtil.phoneNumber(number)
   * @param {string} 手机号码
   * @return {boolean} 手机号是否符合规范
   */
  phoneNumber: function (number) {
    return mobilephoneRegex.test(number)
  }

};

/*
 * 导出为通用模块
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = validateutil;
}