import React, {Component} from 'react';
import {
    Button,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';

const infoLog = require('infoLog');

/**
 * FlatList下拉刷新、上拉加载更多
 */
export default class RefreshFlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            json: [],
            isRefreshing: false,
        };
        this.pageSize = 15;
        this.loadMoreSize = 5;
        this.firstrun = true;
    }


    componentWillMount() {
        this.firstrun = true;
        this.initialData();
    }


    getLabel() {
        let value = parseInt(Math.random() * 10 + 1); // 取[1,10)的随机数
        let strTemp = "";
        switch (value) {
            case 1:
                strTemp = "阿里巴巴";
                break;
            case 2:
                strTemp = "阿里-巴巴";
                break;
            case 3:
                strTemp = "京-东";
                break;
            case 4:
                strTemp = "京东";
                break;
            case 5:
                strTemp = "唯品-会";
                break;
            case 6:
                strTemp = "唯品会";
                break;
            case 7:
                strTemp = "警察叔叔";
                break;
            case 8:
                strTemp = "警察";
                break;
            default:
                strTemp = "小偷";
                ;
        }
        return strTemp;
    }


    initialData() {
        infoLog("-----初始化数据-----");
        let strTemp = this.getLabel();
        let data = [];
        for (let i = 0; i < this.pageSize; i++) {
            let obj = {
                key: strTemp + i,
            };
            data.push(obj);
        }
        this.setState({
            json: data,
        });
    }

    refreshData() {
        this.firstrun = true;
        infoLog("-----刷新-----");
        // 显示刷新视图
        this.setState({isRefreshing: true});
        let strTemp = this.getLabel();
        let data = [];
        for (let i = 0; i < this.pageSize; i++) {
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

    loadMoreData() {
        this.firstrun = false;
        infoLog("-----加载更多-----");
        let strTemp = this.getLabel();
        let data = [];
        for (let i = 0; i < this.loadMoreSize; i++) {
            let obj = {
                key: strTemp + i,
            };
            data.push(obj);
        }
        this.setState({
            json: this.state.json.concat(data),
        });
    }

    getButtonSize(size) {
        infoLog("宽高", size);
    }

    renderItem(item) {
        return <Text style={rfstyles.item}>{item.key}</Text>;
    }

    keyExtractor() {
        let key = "item-" + Math.random();
        return key;
    }




    render() {
        let len = (globalstyle.deviceHeight - 50 - globalstyle.statusBarHeight) / 44;
        console.log("FlatList填充满屏幕的size为：" + len);
        len = parseInt(len);
        return (
            <View style={rfstyles.container}>
                <Text
                    style={{
                        backgroundColor: '#1f96f2',
                        height: 50,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontSize: 18
                    }}>FlatList，下拉刷新，上拉加载更多</Text>
                <FlatList
                    data={this.state.json}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshData.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    onEndReached={()=>{
                        if(this.firstrun){
                            return;
                        }
                        this.loadMoreData();
                    }}
                />
            </View>
        );
    }
}


const rfstyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#bebebe',
    },
});

