import React, {Component} from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import infoLog from 'infoLog';
const TAG = 'RefreshControlExample';
/**
 * 自定义的行视图（属性定制：在render函数中引用this.props，然后使用时按需处理即可。可提高自定义组件的利用范畴。）
 */
class Row extends Component {

    // 属性定制的高级用法（定义视图的行为）
    // _onClick() {
    //     this.props.onClick(this.props.data);
    // }


    _onClick = ()=>{
        this.props.onClick(this.props.data);
    };

    render() {
        infoLog("Row",this.props);
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={rcestyles.row}>
                    <Text style={rcestyles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default class RefreshControlExample extends Component {

    static defaultProps = {
        title: '<RefreshControl>',
        description: 'Adds pull-to-refresh support to a scrollview.'
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
        };
    }

    // 点击行时，将行数据的clicks加1，并更新视图
    // _onClick(row) {
    //     row.clicks++;
    //     this.setState({
    //         rowData: this.state.rowData,
    //     });
    // }

    _onClick = row => {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    };

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            infoLog(TAG,ii);
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        });
        return (
            <ScrollView
                style={rcestyles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }>
                {rows}
            </ScrollView>
        );
    }

    _onRefresh() {
        // 显示刷新视图
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // 增加10条数据到rowData头
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,    // 关闭刷新视图
                rowData: rowData,
            });
        }, 4000);
    }
}

const rcestyles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
});