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
import RNTesterPage from '../RNTesterPage';


/**
 * 一个复杂点的长列表，可通过noSpacer、noScroll来控制显示不同的样式
 * noSpacer：没有空白区
 * noScroll：没有滚动
 */
export default class ListViewExample extends Component {

    static defaultProps = {
        title: '<ListView>',
        description: 'Performant, scrollable list of data.',
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
        this._renderRow = this._renderRow.bind(this);
        this._pressRow = this._pressRow.bind(this);
        this._renderSeparator = this._renderSeparator.bind(this)
        this.itemCount = 0;
    }


    componentWillMount() {
        this._pressData = {};  // 创建空的Object对象
    }

    render() {
        return (
            <RNTesterPage
                title={this.props.navigator ? null : '<ListView>'}
                noScroll={false}
                noSpacer={false}>
                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
            </RNTesterPage>
        );
    }

    // 构造行（多次执行，效率低）
    _renderRow(rowData, sectionID, rowID, highlightRow: (sectionID, rowID) => void) {

        // 取正值的哈希码
        var rowHash = Math.abs(hashCode(rowData));
        console.log(rowHash,THUMB_URLS.length,rowHash % THUMB_URLS.length)
        // 图片
        var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowID);
                highlightRow(sectionID, rowID);
                // if (this._pressData[rowID]) {
                //     highlightRow(null);
                // } else {
                //     highlightRow(sectionID, rowID);
                // }
            }}>
                <View style={lvestyles.row}>
                    <Image style={lvestyles.thumb} source={imgSource}/>
                    <Text style={lvestyles.text}>
                        {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % LOREM_IPSUM.length)}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }


    /**
     * 构造字符串数组['Row 0','Row 1','Row 2',……]，用于展示列表。如果pressData对象有对应的key，则添加' (pressed)'
     * @param pressData
     * @returns {Array}
     * @private
     */
    _genRows(pressData) {
        var dataBlob = [];
        for (var ii = 0; ii < 20; ii++) {
            var pressedText = pressData[ii] ? ' (pressed)' : '';
            dataBlob.push('Row ' + ii + pressedText);
        }
        return dataBlob;
    }


    // 点击行（置hashtable值为真）
    _pressRow(rowID) {
        // this._pressData[rowID]为undefined，即为false，取反即为true，存hashtable
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this._genRows(this._pressData)
            )
        });
    }


    // 分隔符添加样式
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        this.itemCount++;
        console.log("itemCount-->" + this.itemCount);
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
}

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

var LOREM_IPSUM = '君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。';

/**
 * 计算哈希码
 * @param str
 * @returns {number}
 */
var hashCode = function (str) {
    let hash = 15;
    for (let ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

const lvestyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});

