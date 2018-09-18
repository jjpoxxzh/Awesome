import React, {Component} from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    RefreshControl,
    Platform,
    StyleSheet,
    StatusBar,
    Text,
    View
} from 'react-native';

// import infoLog from 'react-native/Libraries/Utilities/infoLog';
const infoLog = require('react-native/Libraries/Utilities/infoLog');

const screen = Dimensions.get('window');

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;
/**
 * 测试FlatList在不足一屏时加更多数据时，引发的列表数据加载异常的问题。
 * FlatList如果动态增加数据，且数据不足一屏，与ListView一样，会发生自动调用onEndReached()方法的问题。
 */
export default class FlatListLoadMore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            json: [
                {key: 'Devin'}, {key: 'Jackson'}, {key: 'James'}, {key: 'Joel'},
                {key: 'John'}, {key: 'Jillian'}, {key: 'Jimmy'}, {key: 'Julie'},
            ],
            isRefreshing: false,
        };
        this.flatListRenderCount = 0;
        this.itemCount = 0;
        this.loadMore = 0;
    }


    getLabel() {
        let value = parseInt(Math.random() * 10 + 1); // 取[1,10)的随机数
        let strTemp = "";
        // if (value % 2 == 0) {
        //     return "唯品会";
        // } else {
        //     return "阿里巴巴";
        // }
        // return "京东";
        switch (value) {
            case 1:
            case 2:
                strTemp = "阿里巴巴";
                break;
            case 3:
            case 4:
                strTemp = "京东";
                break;
            case 5:
            case 6:
                strTemp = "唯品会";
                break;
            case 7:
            case 8:
                strTemp = "警察";
                break;
            default:
                strTemp = "小偷";
                ;
        }
        return strTemp;

    }

    addData() {
        this.itemCount++;
        let one = {
            key: '新增数据' + this.itemCount,
        };
        // setState的几种方法
        // this.setState({
        //     json: this.state.json.concat(one),
        // });
        this.setState(preState => {
            infoLog("ngl", preState);
            return {json: preState.json.concat(one)};
        });
    }


    getData() {
        if (this.loadMore < 3) {
            this.loadMore++;
            let strTemp = this.getLabel();
            let data = [];
            for (let i = 0; i < 10; i++) {
                let obj = {
                    key: strTemp + i,
                };
                data.push(obj);
            }
            this.setState({
                json: this.state.json.concat(data),
            });
        }
    }

    getButtonSize(size) {
        infoLog("宽高", size);
    }

    renderItem(item) {
        //
        return <Text style={flmstyles.item} onLayout={({nativeEvent: e}) => infoLog("宽高", e)}>{item.key}</Text>;
    }

    keyExtractor() {
        let key = "item-" + Math.random();
        return key;
    }

    onRefresh() {
        // 显示刷新视图
        this.setState({isRefreshing: true});
        let strTemp = this.getLabel();
        let data = [];
        for (let i = 0; i < 10; i++) {
            let obj = {
                key: strTemp + i,
            };
            data.push(obj);
        }

        setTimeout(() => {
            this.setState({
                json: data,
                isRefreshing: false,    // 关闭刷新视图
            });
        }, 2500);
    }


    render() {
        let len = (screen.height - 25 - 50 - statusBarHeight) / 44;
        console.log("FlatList填充满屏幕的size为：" + len);
        len = parseInt(len);
        this.flatListRenderCount++;
        infoLog("---------->", this.flatListRenderCount);
        return (
            <View style={flmstyles.container}>
                <Text
                    style={{
                        backgroundColor: '#1f96f2',
                        height: 50,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontSize: 18
                    }}
                    onPress={() => {
                        this.addData()
                    }}>FlatList添加一条</Text>
                <FlatList
                    data={this.state.json}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    onEndReached={() => {
                        if (this.state.json.length > len) {
                            console.log('----------------------');
                            this.getData()
                        }
                    }}
                />
            </View>
        );
    }
}


const flmstyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#bebebe',
    },
});

