import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import TopTitle1 from './TopTitle';
import TopTitle2 from './TopTitle2';

/**
 * Flexbox样式测试
 */
export default class FlexboxTest extends Component {

    render() {
        return (
            <View style={{flex: 1,}}>
                <TopTitle1 />
                <TopTitle2 />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',    // 主轴沿着y轴，次轴沿x轴
                    justifyContent: 'space-around',     // y轴方向上元素位于区域中间位置，左右被相等距离包裹
                    backgroundColor: '#FFAC69',
                }}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',   // 主轴沿x轴，次轴沿y轴
                    justifyContent: 'flex-end', // x轴方向上元素排列在尾部依次紧挨
                    alignItems: 'stretch',  // y轴上充满
                }}>
                    <View style={{width: 50, backgroundColor: 'powderblue'}}/>
                    <View style={{width: 50, backgroundColor: 'skyblue'}}/>
                    <View style={{width: 50, backgroundColor: 'steelblue'}}/>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',   // 主轴沿x轴，次轴沿y轴
                    justifyContent: 'flex-end', // x轴方向上元素排列在尾部依次紧挨
                    alignItems: 'center',   // y轴方向上元素居中排列
                    backgroundColor: '#6CCBC7',
                }}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                    {/*这个子元素在y轴上排在尾部，而不是居中*/}
                    <View style={{width: 50, height: 50, alignSelf: 'flex-end', backgroundColor: 'skyblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
                </View>
            </View>
        );
    }
}