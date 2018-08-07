import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import TopTitle1 from './TopTitle';
import TopTitle2 from './TopTitle2';
import * as config from './styleconfig';

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
                    flex: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: config.color_1,
                }}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: config.color_3,
                }}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                    <View style={{width: 50, height: 50, alignSelf: 'flex-end', backgroundColor: 'skyblue'}}/>
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
                </View>
            </View>
        );
    }
}