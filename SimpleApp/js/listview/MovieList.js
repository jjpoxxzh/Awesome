import React, {Component} from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';

import TopTitle from '../TopTitle3';

/**
 * 简单的列表实例，展示电影信息
 */
export default class MovieList extends Component {

    //构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            load: 0,    // 数据的请求状态(0请求中，1请求成功，2请求失败)
        };
        this.renderItemCount = 0;   // 统计渲染时加载的次数(官方文档说是会全部渲染，其实不是)
        this.renderSeperatorCount = 0;  // 统计分隔线方法执行的次数

    }

    componentWillMount() {
        this.fetchData();
    }

    // 取数据
    fetchData() {
        // 地址有可能改变，参见https://reactnative.cn/docs/0.51/sample-application-movies.html
        let REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.movies.length);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    load: 1,
                });
            }).catch(e => {
            console.log("错误信息", e);
            this.setState({
                load: 2,
            });
        });
    }

    reload() {
        this.setState({
            load: 0,
        });
        this.fetchData();
    }

    failed(){
        this.setState({
            load: 2,
        })
    }

    renderLoadingView() {
        return (
            <View style={mlstyles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    renderLoadFailed() {
        return (
            <View style={mlstyles.container}>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        load: 0,
                    }, this.fetchData());
                }}>
                    <Text style={{fontSize: 20, color: 'red',}}>
                        加载失败，请重试！
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderMovie(rowData, sectionID, rowID, highlightRow) {
        this.renderItemCount++;
        console.log("renderItemCount：" + this.renderItemCount);
        // 如果要设置highlightRow，要在内层有View层，不能把TouchableHighlight直接作为布局容器
        return (
            <TouchableHighlight underlayColor='#beb' onPress={() => {
                highlightRow(sectionID, rowID);
            }}>
                <View style={mlstyles.item}>
                    <Image
                        source={{uri: rowData.posters.thumbnail}}
                        style={mlstyles.thumbnail}
                    />
                    <View style={mlstyles.rightContainer}>
                        <Text style={mlstyles.title}>{rowData.title}</Text>
                        <Text style={mlstyles.year}>{rowData.year}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        this.renderSeperatorCount++;
        console.log("renderSeperatorCount：" + this.renderSeperatorCount);
        console.log(sectionID, rowID, adjacentRowHighlighted);
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }

    render() {
        if (this.state.load === 0) {
            return this.renderLoadingView();
        } else if (this.state.load === 2) {
            return this.renderLoadFailed();
        } else if (this.state.load === 1) {
            return (
                <View style={{flex: 1}}>
                    <TopTitle title="电影" leftCallback={() => this.reload()} rightCallback={()=>{this.failed()}} />
                    <ListView dataSource={this.state.dataSource}
                              renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderMovie(rowData, sectionID, rowID, highlightRow)}
                              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                                  this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                              style={mlstyles.list}/>
                </View>
            );
        }
    }
}

const mlstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingTop: 0,  // 高度刚好为Item项的总和高度，如果有paddingTop，则最后一项显示不全
        backgroundColor: '#F5FCFF',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    }
});
