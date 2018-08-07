import React, {Component} from 'react';
import {
    Button,
    Image,
    ListView,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

/**
 * 下拉刷新、上拉加载更多的实例
 */
export default class MovieListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            isRefresh: false,
        };
        this.data = [];
        this.count = 0;
    }

    componentDidMount() {
        this.fetchData();
    }

    // 取数据
    fetchData() {
        this.data = [];
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                let arr = responseData.movies;
                this.data = this.data.concat(arr);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data),
                    loaded: true,
                });
            }).catch(e => {
            console.log(e);
        });
    }


    getListData() {
        this.count++;
        if (this.count < 3) {
            let arr = [];
            let tempImg = 'http://img.ds.cn/none.png';
            for (let i = 0; i < 10; i++) {
                let strTemp = {
                    title: '测试数据' + i,
                    year: '2017',
                    posters: {
                        thumbnail: tempImg,
                    }
                };
                arr.push(strTemp);
            }
            this.data = this.data.concat(arr);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                loaded: true,
            });
        }
    }


    onRefresh() {
        this.setState({isRefresh: true});
        this.count = 0;
        setTimeout(() => {
            this.data = [];
            fetch(REQUEST_URL)
                .then(response => response.json())
                .then(responseData => {
                    let arr = responseData.movies;
                    this.data = this.data.concat(arr);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data),
                        isRefresh: false,
                    });
                }).catch(e => {
                console.log(e);
            });
        }, 2000);
    }


    // 数据加载中
    renderLoadingView() {
        return (
            <View style={mlvstyles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    // 加载完毕
    renderMovie(movie, rowID) {
        return (
            <View style={mlvstyles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={mlvstyles.thumbnail}
                />
                <View style={mlvstyles.rightContainer}>
                    <Text style={mlvstyles.title}>{movie.title}</Text>
                    <Text style={mlvstyles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }

    renderFoot() {
        return (
            <View style={{
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ebebeb'
            }}>
                <Text style={{fontSize: 25, color: '#aaaaaa'}}>没有更多数据</Text>
            </View>
        )
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={{flex: 1}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderMovie}
                          style={mlvstyles.listview}
                          scrollsToTop={false}
                          onEndReached={() => this.getListData()}
                          renderFooter={() => this.renderFoot()}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefresh}
                                  onRefresh={() => this.onRefresh()}
                              />
                          }
                />
            </View>
        );
    }
}

const mlvstyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    rightContainer: {
        flex: 1,
        backgroundColor: '#6CCBC7'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    listview: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
