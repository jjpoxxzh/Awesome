import {
    AppRegistry,
} from 'react-native';

// // 全局样式，目前用在JSX的render()函数中没有问题，但用在styles中会出错
// import * as config from './styleconfig';
// global.globalstyle = config;

// 各种代码测试
import MainTest from './MainTest';

// FlexBox布局测试(含TitleBar)
import FlexboxTest from './FlexboxTest';

// 属性及布局（含标题栏的测试）
import PropTest from './PropTest';

// 属性及布局展示（Text文本居中显示效果）
import PropTest2 from './PropTest2';

// 相对布局、绝对布局
import LayoutTest from './LayoutTest';

// 样式覆盖(后定义的样式会覆盖先定义的样式)
import StyleTest from './StyleTest';

// 属性及状态的研究与测试
import StateTest from './StateTest';

// 文本输入测试
import TextInputTest from './TextInputTest';

// 简单ListView，获取JSONs数据并加载
import MovieList from './listview/MovieList';

// 简单电影列表，上拉加载更多，下拉刷新
import MovieListView from './listview/MovieListView';

// 简单电影列表，测试上拉加载更多的bug（不足一屏时由小到多时发生)
import MovieListPaging from './listview/MovieListPaging';

// 稍微复杂点的列表
import ListViewExample from './listview/ListViewExample';

// 网格式列表
import ListViewGridLayoutExample from './listview/ListViewGridLayoutExample';

// 列表分页
import ListViewPagingExample from './listview/ListViewPagingExample';

// 简单的FlatList列表
import SimpleFlatList from './flatlist/SimpleFlatList';

// 复杂点的FlatList列表
import FlatListExample from './flatlist/FlatListExample';

// FlatList长列表，测试不足一屏的bug
import FlatListLoadMore from './flatlist/FlatListLoadMore';

// FlatList下拉刷新、上拉加载更多
import RefreshFlatList from './flatlist/RefreshFlatList';

// SectionList分组列表
import SectionListBasics from './sectionlist/SectionListBasics';

// 下拉刷新的简单应用
import RefreshControlExample from './RefreshControlExample';

// 导航栏的简单应用StackNavigator
import  StackNaviTest from './StackNaviTest';
const stacknav = StackNaviTest.simple;

import  StackNaviTest2 from './StackNaviTest2';

// 导航栏的简单应用TabNavigator
import  TabNaviTest from './TabNaviTest';
const tabnav = TabNaviTest.simple;

// 导航栏嵌套
import NestNaviTest from './NestNaviTest';
const nestnav = NestNaviTest.simple;

// 点击事件
import ClickEventTest from  './ClickEventTest';

// ScrollView使用
import ScrollViewTest from './ScrollViewTest';

// Button样式
import  ButtonTest from './ButtonTest';

// 倒计时读秒(一个标准写法的自定义组件)
import  TimerTest from './TimerTest';

// Tab使用
import SimpleExample from './tab/SimpleExample';

// Tab使用
import ScrollableTabsExample from './tab/ScrollableTabsExample';

// Tab使用
import OverlayExample from './tab/OverlayExample';

// Tab使用
import FacebookExample from './tab/FacebookExample';

// 图片测试
import ImageTest from './ImageTest';

// 轮播
import SwiperTest from  './SwiperTest';

// 简单的动画
import AnimationTest from './AnimationTest';

import ButtonExample from './ButtonExample';

// react native 库自带的Modal
import ModalExample1 from './dialog/ModalExample1';
import ModalExample2 from './dialog/ModalExample2';
// react-native-modalbox 的Modal
import ModalExample3 from './dialog/ModalExample3';

// 触碰滚动
import BallTest from './touch/BallTest';

import ModalTest from './dialog/ModalTest'

// Native代码测试(简单的原生模块代码调用)
import NativeTest from './NativeTest';
// Native代码测试（一个详细的原生模块）
import NativeTest2 from './NativeTest2';

// 联系人
import LetterList from './nativemodule/Contacts';
import LottieAnimatedExample from './LottieAnimatedExample';


import ParallaxTest from './ParallaxTest';

AppRegistry.registerComponent('SimpleApp', () => StackNaviTest2);