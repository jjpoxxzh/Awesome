import React, {Component} from 'react';
import {
    Dimensions,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import LetterIndex from './LetterIndex';
import infoLog from 'infoLog';
import listData from './letters.json';
const {width, height} = Dimensions.get('window');
/**
 * 通讯录列表
 */
export default class Contacts extends Component {

    //构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            result: 1,
        };
    }


    componentDidMount() {
        let data = listData.contact;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            loaded: true,
            result: 1,
        }, () => {
            infoLog("获取到数据，设置属性")
        });
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        if (this.state.loaded && this.state.result == 0) {
            return this.renderLoadFailed();
        }
        return (
            <View style={{flex: 1}}>
                {/*<ListView dataSource={this.state.dataSource}
                 renderRow={this.renderMovie}
                 style={contacts_styles.lv}/>*/}
                <LetterIndex style={{height: height - 30, width: 30, position: 'absolute', right: 10,}}
                                 onTouchLettersUp={() => {
                                     console.log("移开")
                                 }}
                                 onTouchLettersDown={() => {
                                     console.log("碰触");
                                 }}
                />
            </View>
        );
    }


    // 数据加载中
    renderLoadingView() {
        return (
            <View style={contacts_styles.container}>
                <Text>
                    正在加载电影数据……
                </Text>
            </View>
        );
    }

    // 加载失败
    renderLoadFailed() {
        return (
            <View style={contacts_styles.container}>
                <TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'red',}}>
                        加载失败，请重试！
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 加载完毕
    renderMovie(list) {
        return (
            <View style={contacts_styles.container}>
                <View style={contacts_styles.letter}><Text>{list.firstLetter}</Text></View>
                <Text style={contacts_styles.title}>{list.name}</Text>
            </View>
        );
    }
}

const contacts_styles = StyleSheet.create({
    container: {
        height: 40,
        paddingLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
    },
    letter: {
        height: 20,
        paddingLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#bebebe',
    },
    rightContainer: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'left',
    },
    year: {
        textAlign: 'center',
    },
    lv: {
        backgroundColor: '#F5FCFF',
    }
});
