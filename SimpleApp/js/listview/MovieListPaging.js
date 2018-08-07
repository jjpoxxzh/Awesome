import React, {Component} from 'react';
import {
    Button,
    Dimensions,
    Image,
    ListView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

var screen = Dimensions.get('window');

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
const image = 'http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg';

/**
 * 上拉加载更多的实例（数据行不满屏的问题怎么解决？）
 * 列表动态增加时，数据不满屏，会触发onEndReached方法。比如屏幕能显示10条，初次次加载为5条，每次增加1条，
 * 增加一条时onEndReached被调用，这是一个缺陷问题。
 * 解决方法一：通过onContentSizeChange计算实际当前列表的宽高，高度还包括头与尾，所以计算时要注意。
 * 解决方法二：通过计算可列表可展示的个数，来控制是否需要调用此方法。
 * 这二种方法适用于除列表外，其他视图的高度可确定的情况，但Button无法测算高度，则不可计算。此外，状态栏的高度如何计算，这是一个问题。
 */
export default class MovieListPaging extends Component {

    //构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        this.data = [];
        this.newSize = 0;
        this.count = 0;
        this.contentHeight = 0;
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
                let arr = responseData.movies.slice(0, 4);
                this.data = this.data.concat(arr);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data),
                    loaded: true,
                });
            }).catch(e => {
            console.log(e);
        });
    }

    addOneMoreData() {
        this.newSize++;
        let a = {
            title: '手动添加增加' + this.newSize,
            year: 2017,
            posters: {
                thumbnail: image,
            },
        };
        this.data = this.data.concat(a);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.data),
            loaded: true,
        });
    }


    getListData() {
        this.count++;
        if (this.count <= 2) {
            let arr = [];
            let tempImg = 'http://img.ds.cn/none.png';
            for (let i = 0; i < 10; i++) {
                let strTemp = {
                    title: '自动添加的测试数据' + i,
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

    renderFoot() {
        return (
            <View style={{
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ebebeb',
                borderColor: '#beb',
                borderWidth: 2,
            }}>
                <Text style={{fontSize: 25, color: '#aaaaaa'}}>没有更多数据</Text>
            </View>
        )
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        // (屏幕高度-标题-间隔-状态栏高度)/Item项的高 == 屏幕上能显示的项数
        let len = (screen.height - 50 - 20 - StatusBar.currentHeight) / 81;
        console.log("ListView填充满屏幕的size为：" + len);
        // 取整，当达到满屏个数时，即可执行上拉加载的方法。
        len = parseInt(len);
        return (
            <View style={{flex: 1}}>
                <Text style={{
                    backgroundColor: '#1f96f2',
                    height: 50,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 18
                }} onPress={() => {
                    this.addOneMoreData()
                }}>ListView添加一条</Text>

                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderMovie.bind(this)}
                          style={mlpstyles.listview}
                          scrollsToTop={false}
                          onEndReached={() => {
                              // 未达满屏时不调用
                              if (this.contentHeight >= len * 81) {
                                  this.getListData();
                              }
                          }}
                          renderFooter={() => this.renderFoot()}
                          onContentSizeChange={(contentWidth, contentHeight) => {
                              this.contentHeight = contentHeight;
                              console.log("ListView当前宽高为：", contentWidth, contentHeight, len * 81);
                          }}
                />
            </View>
        );
    }


    // 数据加载中
    renderLoadingView() {
        return (
            <View style={mlpstyles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    // 加载完毕
    renderMovie(movie, rowID) {
        // View计算宽高的方法 onLayout={({nativeEvent: e}) => infoLog("宽高", e)}
        return (
            <View style={mlpstyles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={mlpstyles.thumbnail}
                />
                <View style={mlpstyles.rightContainer}>
                    <Text style={mlpstyles.title}>{movie.title}</Text>
                    <Text style={mlpstyles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
}

const mlpstyles = StyleSheet.create({
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
        backgroundColor: '#ebebeb'
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
        backgroundColor: '#FFAC69',
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
