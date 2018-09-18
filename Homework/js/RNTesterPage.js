import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import PropTypes from 'prop-types';

import RNTesterTitle from './RNTesterTitle';


/**
 * 通用的容器组件，用于包裹住其他的组件
 */
export default class RNTesterPage extends Component {

    static defaultProps = {
        noScroll: false,     // 控制是否不可滚动。false表示可滚动，使用ScrollView作容器；true不可滚动，用View来作容器
        noSpacer: false,    // 控制底部是否无空白区。false有空区域，用View来表示一块空白区域；true表示无空白区域
        title: '',      // 控制是否显示标题视图
    };
    static propTypes = {
        noScroll: PropTypes.bool,
        noSpacer: PropTypes.bool,
        title: PropTypes.string,
    };


    render() {
        console.log(101102103, this.props.children)
        var ContentWrapper;
        var wrapperProps = {};  // 空的对象
        if (this.props.noScroll) {      // 不可滚动时设置为View
            ContentWrapper = View;
        } else {        // 可滚动时设置为ScrollView
            ContentWrapper = ScrollView;
            wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
            wrapperProps.keyboardShouldPersistTaps = 'handled';
            wrapperProps.keyboardDismissMode = 'interactive';
        }
        var title = this.props.title ? <RNTesterTitle title={this.props.title}/> : null;
        var spacer = this.props.noSpacer ? null : <View style={styles.spacer}/>;

        return (
            <View style={styles.container}>
                {title}
                <ContentWrapper
                    style={styles.wrapper}
                    {...wrapperProps} >
                    {this.props.children}
                    {spacer}
                </ContentWrapper>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9eaed',
        flex: 1,
    },
    spacer: {
        height: 200,
        backgroundColor: '#beb',
    },
    wrapper: {
        flex: 1,
        paddingTop: 10,
    },
});