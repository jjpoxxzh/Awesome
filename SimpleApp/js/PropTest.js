import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import PropTypes from 'prop-types';
const {width} = Dimensions.get('window');

/**
 * Greeting 组件
 */
class Greeting extends Component {

    static propTypes = {
        name: PropTypes.string,
    };
    static defaultProps = {
        name: '大佬',
    };

    render() {
        return (
            <Text style={{
                backgroundColor: '#FFAC69',
                width: 100,
                height: 60,
                borderWidth: 2
            }}>Hello {this.props.name}!</Text>
        );
    }
}

/**
 * Header 组件
 */
class Header extends Component {
    static propTypes = {
        index: PropTypes.number,
        data: PropTypes.array
    };
    static defaultProps = {
        index: 0,
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            select: this.props.index,
        };
    }

    renderItems() {
        let data = this.props.data || [];
        return data.map((item, key) => {
            const bgColor = key === this.state.select ? {backgroundColor: 'red'} : {backgroundColor: '#2a3846'};
            const textColor = key === this.state.select ? '#ffffff' : '#4bbfed';
            return (
                <TouchableOpacity key={key} style={[bgColor, prop_style.headerItem]}
                                  onPress={() => {
                                      this.setState({
                                          select: key
                                      });
                                      this.props.onPress && this.props.onPress(key);
                                  }}
                >
                    <Text style={{fontSize: 30, color: textColor}}>{item.time}</Text>
                    <Text style={{fontSize: 30, color: textColor}}>{item.title}</Text>
                </TouchableOpacity>
            )
        })
    }

    render() {
        return (
            <View style={{flexDirection: 'row',}}>
                {this.renderItems()}
            </View>
        )
    }
}


/**
 * 布局样式测试
 */
export default class PropApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isValue: false,
        };
    }

    render() {
        let text = [
            {time: '10:00', startTime: '10:00:00', endTime: '14:00:00', title: '上午场'},
            {time: '16:00', startTime: '16:00:00', endTime: '21:00:00', title: '下午场'}
        ];
        return (
            <View style={prop_style.container}>
                <Header index={0} data={text} onPress={(index) => {
                    this.setState({isValue: !this.state.isValue});
                }}/>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#bebebe', flexWrap: 'wrap'}}>
                    <Greeting name='aaa'/>
                    <Greeting name='bbb'/>
                    <Greeting name='ccc'/>
                    <Greeting name='111'/>
                    <Greeting name='222'/>
                    <Greeting name='333'/>
                    <Greeting name='444'/>
                    <Greeting name='555'/>
                    <Greeting name='666'/>
                    <Greeting name='777'/>
                    <Greeting />
                    <Greeting />
                    <Greeting />
                </View>
            </View>
        );
    }
}

const prop_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e7e7e7',
    },
    headerItem: {
        width: width / 2,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});