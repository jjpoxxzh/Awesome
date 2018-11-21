import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    RefreshControl,
} from 'react-native';

import ScrollView from './nativemodule/ScrollView';

var screen = Dimensions.get('window');

const favicon = require('./img/favicon.png');
/*
 *  ScrollView使用
 */
export default class ScrollViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

    }

    toEnd() {
        this.scrollView.scrollToEnd();
    }

    toStart() {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 3000);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <TouchableHighlight style={scrollViewStyle.operation} onPress={() => this.toEnd()}>
                    <Text>滑动到底</Text>
                </TouchableHighlight>
                <ScrollView
                    style={scrollViewStyle.sv}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref={(scrollView) => {
                        this.scrollView = scrollView
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={['#f32e37', '#FFAC69', '#F08176']}
                            enabled={true}
                        />
                    }
                    onScroll={
                        Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {
                            listener: (e) => {
                                const y = e && e.nativeEvent.contentOffset.y;
                                console.log('y', y);
                            },
                        })
                    }
                    scrollEventThrottle={16}
                >
                    <Text style={scrollViewStyle.tv}>Scroll me plz</Text>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Text style={scrollViewStyle.tv}>If you like</Text>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Text style={scrollViewStyle.tv}>Scrolling down</Text>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Text style={scrollViewStyle.tv}>What's the best</Text>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Text style={scrollViewStyle.tv}>Framework around?</Text>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Image style={scrollViewStyle.img} source={favicon}/>
                    <Text style={scrollViewStyle.tv}>React Native</Text>
                </ScrollView>

                <TouchableHighlight style={scrollViewStyle.operation} onPress={() => this.toStart()}>
                    <Text>滑动到顶</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const scrollViewStyle = StyleSheet.create({
    operation: {
        width: screen.width,
        height: 40,
        backgroundColor: '#FFAC69',
    },
    sv: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#f3f3f3',
        borderWidth: 1, borderColor: '#FFAC69',
    },
    tv: {
        fontSize: 20,
    },
    img: {
        width: 100,
        height: 100,
    }
});
