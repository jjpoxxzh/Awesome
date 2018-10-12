import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

/**
 * ScrollView实现ViewPager滚动的效果
 */
export default class CirculateView extends Component {

    static propTypes = {
        duration: PropTypes.number,
        data: PropTypes.array,
    };

    static defaultProps = {
        duration: 2000,     // 每隔多少秒执行一次
        data: [
            { "img": require('./img/001.jpg'), "title": "你那一笑倾国倾城" },
            { "img": require('./img/002.jpg'), "title": "那里记录了最唯美的爱情故事" },
            { "img": require('./img/003.jpg'), "title": "这是一个美好的开始" },
            { "img": require('./img/004.jpg'), "title": "生命中最后的四分钟" },
            { "img": require('./img/005.jpg'), "title": "我们都需要治疗" },
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
    }

    componentDidMount() {
        this.startTime();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    startTime() {
        const {
            duration, data
        } = this.props;
        this.timer = setInterval(() => {
            let activePage = 0;
            if ((this.state.currentPage + 1) >= data.length) {
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            this.setState({
                currentPage: activePage
            })
            let offsetX = activePage * width;
            this.scrollview.scrollTo({ x: offsetX, y: 0, animated: true });
        }, duration);
    }

    // 当一帧滚动开始
    onAnimationBegin(e) {
        clearInterval(this.timer)
    }

    // 当一帧滚动结束
    onAnimationEnd(e) {
        // 求出水平方向的偏移量  
        var offsetX = e.nativeEvent.contentOffset.x;
        // 求出当前的页数
        var currentPage = Math.round(offsetX / width);
        // alert(currentPage);
        this.setState({
            currentPage: currentPage
        }, () => { this.startTime(); });
        // this.startTime();
    }
    // 开始拖拽
    onScrollerBeginDrag() {
        clearInterval(this.timer);
    }

    // 停止拖拽
    onScrollEndDrag() {
        this.startTime();
    }
    //返回所有的图片  
    creatImages() {
        const {
            data
        } = this.props;
        let allImage = [];
        for (var i = 0; i < data.length; i++) {
            var imageItem = data[i];
            allImage.push(
                <Image key={i} source={imageItem.img} style={styles.imageStyle} ></Image>
            );
        }
        return allImage;
    }

    // 返回页面指示器的圆点  
    renderPageIndex() {
        const {
            data
        } = this.props;
        var style;
        let indicatorArr = [];
        for (var i = 0; i < data.length; i++) {
            style = (i == this.state.currentPage) ? { color: 'orange' } : { color: '#E8E8E8' }
            indicatorArr.push(
                <Text key={i} style={[{ fontSize: 25 }, style]}>•</Text>
            );
        }
        return indicatorArr;
    }

    render() {
        return (
            <View style={styles.circulateViewStyle}>
                <ScrollView
                    ref={c => this.scrollview = c}
                    // 水平滚动  
                    horizontal={true}
                    // 是否显示水平滚动条  
                    showsHorizontalScrollIndicator={false}
                    // 按页滚动  
                    pagingEnabled={true}
                    //滚动动画结束时调用此函数  
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    onMomentumScrollBegin={(e) => this.onAnimationBegin(e)}
                // //开始拖拽  
                // onScrollBeginDrag={(e) => this.onScrollerBeginDrag(e)}
                // //停止拖拽  
                // onScrollEndDrag={(e) => this.onScrollEndDrag(e)}
                >
                    {this.creatImages()}
                </ScrollView>
                <View style={styles.pageViewStyle}>
                    {this.renderPageIndex()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    circulateViewStyle: {
        marginTop: 20,
        height: 150,
        width: width,
    },
    imageStyle: {
        width: width,
        height: 150
    },
    pageViewStyle: {
        width: width,
        height: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    }
}); 