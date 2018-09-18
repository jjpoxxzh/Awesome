import React, {Component} from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import PropTypes from 'prop-types';

var THUMB_URLS = [
    require('../Thumbnails/like.png'),
    require('../Thumbnails/dislike.png'),
    require('../Thumbnails/call.png'),
    require('../Thumbnails/fist.png'),
    require('../Thumbnails/bandaged.png'),
    require('../Thumbnails/flowers.png'),
    require('../Thumbnails/heart.png'),
    require('../Thumbnails/liking.png'),
    require('../Thumbnails/party.png'),
    require('../Thumbnails/poke.png'),
    require('../Thumbnails/superlike.png'),
    require('../Thumbnails/victory.png'),
];

/**
 * 网格布局的ListView
 */
export default class ListViewGridLayoutExample extends Component {

    static defaultProps = {
        title: '<ListView> - Grid Layout',
        description: 'Flexbox grid layout.'
    };
    static PropTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
        this._pressData = {};

        this._pressRow = this._pressRow.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }


    render() {
        return (
            <ListView
                contentContainerStyle={lvglestyles.list}
                dataSource={this.state.dataSource}
                initialListSize={21}
                pageSize={3}
                scrollRenderAheadDistance={500}
                renderRow={this._renderRow}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
                <View>
                    <View style={lvglestyles.row}>
                        <Image style={lvglestyles.thumb} source={imgSource}/>
                        <Text style={lvglestyles.text}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _genRows(pressData): Array<string> {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (X)' : '';
            dataBlob.push('Cell ' + ii + pressedText);
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this._genRows(this._pressData)
            )
        });
    }
}

/* eslint no-bitwise: 0 */
var hashCode = function (str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var lvglestyles = StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',   // x轴为主轴方向
        flexWrap: 'wrap',   // 分行
        alignItems: 'flex-start',   // 次轴方向上从顶端开始排
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 100,     // 子视图的宽度决定了一行可以排几个格，而不是由ListView的属性来指定个数
        height: 100,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    thumb: {
        width: 64,
        height: 64
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
});

