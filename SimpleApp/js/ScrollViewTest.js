import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

var screen = Dimensions.get('window');

const favicon = require('./img/favicon.png');
/*
 *  ScrollView使用
 */
export default class ScrollViewTest extends Component {

    toEnd() {
        this.scrollView.scrollToEnd();
    }

    toStart() {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight style={scrollViewStyle.operation} onPress={() => this.toEnd()}>
                    <Text>滑动到底</Text>
                </TouchableHighlight>
                <ScrollView
                    style={{flex: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#f3f3f3'}}
                    horizontal={false}
                    ref={(scrollView) => {
                        this.scrollView = scrollView
                    }}
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
    tv: {
        fontSize: 20,
        backgroundColor: '#FFAC69',
    },
    img: {
        width: 100,
        height: 100,
    }
});
