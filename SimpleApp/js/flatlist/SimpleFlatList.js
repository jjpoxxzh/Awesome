import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';


/*
 * FlatList组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。
 * FlatList更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。
 * ListView是立即渲染所有元素，置屏幕外的元素为不可见，FlatList比ListView性能高很多。
 */

export default class SimpleFlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            json: [
                {key: 'Devin'}, {key: 'Jackson'}, {key: 'James'}, {key: 'Joel'},
                {key: 'John'}, {key: 'Jillian'}, {key: 'Jimmy'}, {key: 'Julie'},
                {key: '林林漆'}, {key: '哈利波特'}, {key: '伏地魔'}, {key: '阿汤哥'},
                {key: 'AAA'}, {key: 'BBB'}, {key: 'CCC'}, {key: 'DDD'},
            ],
        };
    }


    renderItem(item) {
        let key = "-item-" + Math.random();
        return <Text key={key} style={sfstyles.item}>{item.key}</Text>;
    }


    // 只要存在onEndReached方法，不管满不满屏它都会执行。
    render() {
        return (
            <View style={sfstyles.container}>
                <FlatList
                    data={this.state.json}
                    renderItem={({item}) => this.renderItem(item)}
                    onEndReached={() => {
                        alert("-------")
                    }}
                />
            </View>
        );
    }
}


const sfstyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

