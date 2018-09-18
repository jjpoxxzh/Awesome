import React, {Component} from 'react';
import {
    Animated,
    Button,
    Dimensions,
    Image,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';
import px2pd from './util';


const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const headH = px2pd(isIOS ? 140 : 120);
const inputHeight = px2pd(28);
const imgTypes = [{src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')},
    {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')},
    {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')},
    {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')}, {src: require('./img/favicon.png')},];
/**
 * 仿百度外卖首页
 * @type {boolean}
 */
export default class SwiperTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: "联锦大厦",
        }
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                {/*定位、天气*/}
                <View style={styles.lbsWeather}>
                    <TouchableWithoutFeedback>
                        <View style={styles.lbs}>
                            <Image source={require('./img/location.png')}
                                   style={{width: px2pd(18), height: px2pd(18)}}></Image>
                            <Text style={{
                                fontSize: px2pd(16),
                                fontWeight: 'bold',
                                color: '#fff',
                                paddingHorizontal: px2pd(5)
                            }}>{this.state.location}</Text>
                            <Image source={require('./img/arrow_down.png')}
                                   style={{width: px2pd(16), height: px2pd(16)}}></Image>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.weather}>
                        <View style={{marginRight: px2pd(5)}}>
                            <Text style={{fontSize: px2pd(11), color: '#fff', textAlign: 'center'}}>{'20℃'}</Text>
                            <Text style={{fontSize: px2pd(11), color: '#fff'}}>{'晴天'}</Text>
                        </View>
                        <Image source={require('./img/sun.png')}
                               style={{width: px2pd(20), height: px2pd(20)}}></Image>
                    </View>
                </View>
                {/*搜索框*/}
                <View style={{
                    marginTop: px2pd(15),
                }}>
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View style={styles.searchBtn}>
                            <Image source={require('./img/search.png') }
                                   style={{width: px2pd(20), height: px2pd(20)}}></Image>
                            <Text
                                style={{fontSize: px2pd(13), color: '#666', marginLeft: px2pd(15)}}>{'输入商家，商品名称'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Animated.View style={styles.keywords}>
                    {
                        ['肯德基', '烤肉', '吉野家', '粥', '必胜客', '一品生煎', '星巴克'].map((item, i) => {
                            return (
                                <TouchableWithoutFeedback key={i}>
                                    <View style={{marginRight: px2pd(12)}}>
                                        <Text style={{fontSize: px2pd(12), color: '#fff'}}>{item}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </Animated.View>
            </View>
        )
    }

    _renderTypes() {
        const w = width / 4, h = w * .6 + 20;
        let renderSwipeView = (types, n) => {
            return (
                <View style={styles.typesView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{width: w, height: h}, styles.typesItem]}>
                                    <Image source={imgTypes[n + i].src} style={{width: w * .5, height: w * .5}}/>
                                    <Text style={{fontSize: px2pd(12), color: "#666"}}>{item}</Text>
                                </View>
                            )
                            return (
                                isIOS ? (
                                    <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {
                                    }}>{render}</TouchableHighlight>
                                ) : (
                                    <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {
                                    }}>{render}</TouchableNativeFeedback>
                                )
                            )
                        })
                    }
                </View>
            )
        }
        return (
            <Swiper
                height={h * 2.4}
                paginationStyle={{bottom: 10}}
                dotStyle={{backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6}}
                activeDotStyle={{backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}}>
                {renderSwipeView(['美食', '甜品饮品', '商店超市', '预定早餐', '果蔬生鲜', '新店特惠', '准时达', '高铁订餐'], 0)}
                {renderSwipeView(['土豪推荐', '鲜花蛋糕', '汉堡炸鸡', '日韩料理', '麻辣烫', '披萨意面', '川湘菜', '包子粥店'], 8)}
            </Swiper>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this._renderHeader()}
                    <View style={{backgroundColor: "#fff", paddingBottom: px2pd(10)}}>
                        {this._renderTypes()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollView: {
        marginBottom: px2pd(46),
    },
    header: {
        backgroundColor: '#0398ff',
        height: headH,
        paddingTop: px2pd(isIOS ? 30 : 10),
        paddingHorizontal: 16,
    },
    lbsWeather: {
        height: inputHeight,
        overflow: "hidden",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lbs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weather: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBtn: {
        borderRadius: inputHeight,
        height: inputHeight,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keywords: {
        marginTop: px2pd(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typesView: {
        paddingBottom: px2pd(10),
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    typesItem: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});