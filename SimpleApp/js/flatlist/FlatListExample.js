import React, {Component, PureComponent} from 'react';
import {
    Alert,
    Animated,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';

import RNTesterPage from '../RNTesterPage';

import infoLog from 'infoLog';

import {
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    ItemSeparatorComponent,
    PlainInput,
    SeparatorComponent,
    Spindicator,
    genItemData,
    getItemLayout,
    pressItem,
    renderSmallSwitchOption,
} from '../listview/ListExampleShared';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};

/**
 * 复杂点的FlatList
 */
export default class FlatListExample extends PureComponent {

    static defaultProps = {
        title: '<FlatList>',
        description: 'Performant, scrollable list of data.',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: genItemData(100),     // 创建空数组
            debug: false,       // 调试模式
            horizontal: false,      // 水平方向
            inverted: false,            // 翻转滚动方向
            filterText: '',     // 过滤文本
            fixedHeight: true,      // 固定宽高
            logViewable: false,     // 输出log
            virtualized: true,          // 虚拟化可提升性能及内存优化，只能在调试时停用
        };
    }

    // 设置过滤文本
    _onChangeFilterText = (filterText) => {
        this.setState({filterText});
    };

    // 滚动到指定的索引处
    _onChangeScrollToIndex = (text) => {
        this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)});
    };

    //
    _scrollPos = new Animated.Value(0);
    //
    _scrollSinkX = Animated.event(
        [{nativeEvent: {contentOffset: {x: this._scrollPos}}}],
        {useNativeDriver: true},
    );

    _scrollSinkY = Animated.event(
        [{nativeEvent: {contentOffset: {y: this._scrollPos}}}],
        {useNativeDriver: true},
    );

    componentDidUpdate() {
        this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
    }

    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => (
            filterRegex.test(item.text) || filterRegex.test(item.title)
        );
        const filteredData = this.state.data.filter(filter);
        return (
            <RNTesterPage
                noSpacer={true}
                noScroll={true}>
                <View style={flestyles.container}>
                    <View style={flestyles.searchRow}>
                        <View style={flestyles.options}>
                            <PlainInput
                                onChangeText={this._onChangeFilterText}
                                placeholder="Search..."
                                value={this.state.filterText}
                            />
                            <PlainInput
                                onChangeText={this._onChangeScrollToIndex}
                                placeholder="scrollToIndex..."
                            />
                        </View>
                        <View style={flestyles.options}>
                            {renderSmallSwitchOption(this, 'virtualized')}
                            {renderSmallSwitchOption(this, 'horizontal')}
                            {renderSmallSwitchOption(this, 'fixedHeight')}
                            {renderSmallSwitchOption(this, 'logViewable')}
                            {renderSmallSwitchOption(this, 'inverted')}
                            {renderSmallSwitchOption(this, 'debug')}
                            <Spindicator value={this._scrollPos}/>
                        </View>
                    </View>
                    <SeparatorComponent />
                    <AnimatedFlatList
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        ListHeaderComponent={<HeaderComponent />}
                        ListFooterComponent={FooterComponent}
                        data={filteredData}
                        debug={this.state.debug}
                        disableVirtualization={!this.state.virtualized}
                        getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
                        horizontal={this.state.horizontal}
                        inverted={this.state.inverted}
                        key={(this.state.horizontal ? 'h' : 'v') + (this.state.fixedHeight ? 'f' : 'd') }
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="on-drag"
                        legacyImplementation={false}
                        numColumns={1}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                        onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
                        onViewableItemsChanged={this._onViewableItemsChanged}
                        ref={this._captureRef}
                        refreshing={false}
                        renderItem={this._renderItemComponent}
                        contentContainerStyle={flestyles.list}
                        viewabilityConfig={VIEWABILITY_CONFIG}
                    />
                </View>
            </RNTesterPage>
        );
    }

    _captureRef = (ref) => {
        this._listRef = ref;
    };

    _getItemLayout = (data, index) => {
        return getItemLayout(data, index, this.state.horizontal);
    };

    _onEndReached = () => {
        if (this.state.data.length >= 1000) {
            return;
        }
        this.setState((state) => ({
            data: state.data.concat(genItemData(100, state.data.length)),
        }));
    };

    _onRefresh = () => Alert.alert('onRefresh: nothing to refresh :P');

    _renderItemComponent = ({item, separators}) => {
        return (
            <ItemComponent
                item={item}
                horizontal={this.state.horizontal}
                fixedHeight={this.state.fixedHeight}
                onPress={this._pressItem}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
            />
        );
    };
    // This is called when items change viewability by scrolling into or out of
    // the viewable area.
    _onViewableItemsChanged = (info) => {
        // Impressions can be logged here
        if (this.state.logViewable) {
            infoLog('onViewableItemsChanged: ', info.changed.map((v) => ({...v, item: '...'})),);
        }
    };


    _pressItem = (key: string) => {
        this._listRef.getNode().recordInteraction();
        pressItem(this, key);
    };


}


const flestyles = StyleSheet.create({
    container: {
        //backgroundColor: 'rgb(239, 239, 244)',
        flex: 1,
    },
    list: {
        backgroundColor: 'white',
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    searchRow: {
        paddingHorizontal: 10,
    },
});