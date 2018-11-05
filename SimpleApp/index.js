import {
    AppRegistry,
} from 'react-native';

import App from './App';

// // 全局样式，目前用在JSX的render()函数中没有问题，但用在styles中会出错
// import * as config from './styleconfig';
// global.globalstyle = config;

// 各种代码测试
import MainTest from './js/MainTest';

// FlexBox布局测试(含TitleBar)
import FlexboxTest from './js/FlexboxTest';

// 弹性布局、相对布局、绝对布局的对比
import LayoutTest from './js/LayoutTest';

// 属性及布局
import PropTest from './js/PropTest';

// 属性及布局展示（Text文本居中显示效果）
import PropTest2 from './js/PropTest2';

// 样式覆盖(后定义的样式会覆盖先定义的样式)
import StyleTest from './js/StyleTest';

// 生命周期测试(属性与状态变更)
import LifeCycleTest from './js/LifeCycleTest';

// 生命周期测试(mobx)
import MobxRoot from './js/MobxRoot';

// 文本输入测试
import TextInputTest from './js/TextInputTest';

// 简单ListView，获取JSON数据并加载
import MovieList from './js/listview/MovieList';

// 简单电影列表，上拉加载更多，下拉刷新
import MovieListView from './js/listview/MovieListView';

// 简单电影列表，测试上拉加载更多的bug（不足一屏时由小到多时发生)
import MovieListPaging from './js/listview/MovieListPaging';

// 稍微复杂点的列表
import ListViewExample from './js/listview/ListViewExample';

// 网格式列表
import ListViewGridLayoutExample from './js/listview/ListViewGridLayoutExample';

// 列表分页
import ListViewPagingExample from './js/listview/ListViewPagingExample';

// 简单的FlatList列表
import SimpleFlatList from './js/flatlist/SimpleFlatList';

// 复杂点的FlatList列表
import FlatListExample from './js/flatlist/FlatListExample';

// FlatList长列表，测试不足一屏的bug
import FlatListLoadMore from './js/flatlist/FlatListLoadMore';

// FlatList下拉刷新、上拉加载更多
import RefreshFlatList from './js/flatlist/RefreshFlatList';

// SectionList分组列表
import SectionListBasics from './js/sectionlist/SectionListBasics';

// 下拉刷新的简单应用
import RefreshControlExample from './js/RefreshControlExample';

// 栈层次导航 StackNavigator
import  StackNaviTest from './js/navigator/StackNaviTest';

// 底部Tab导航栏 BottomTabNavigator
import  BottomTabNavigator1 from './js/navigator/BottomTabNavigator1';

// 底部Tab导航栏与栈层次导航的嵌套使用，外层为BottomTabNavigator，内层为StackNavigator
import  BottomTabNavigator2 from './js/navigator/BottomTabNavigator2';

// 顶部Tab导航栏 TabNavigator
import  TabNavigatorTest from './js/navigator/TabNavigatorTest';

// 导航栏嵌套
import stackNavigatorTest from './js/navigator/StackNavigatorTest';

// 点击事件
import ClickEventTest from  './js/ClickEventTest';

// ScrollView使用
import ScrollViewTest from './js/ScrollViewTest';

// ScrollView实现ViewPager滚动的效果
import CirculateView from './js/CirculateView';

// Button样式
import  ButtonTest from './js/ButtonTest';

// 倒计时读秒(一个标准写法的自定义组件)
import  TimerTest from './js/TimerTest';

// Tab使用
import SimpleExample from './js/tab/SimpleExample';

// Tab使用
import ScrollableTabsExample from './js/tab/ScrollableTabsExample';

// Tab使用
import OverlayExample from './js/tab/OverlayExample';

// Tab使用
import FacebookExample from './js/tab/FacebookExample';

// 图片测试
import ImageTest from './js/ImageTest';

// 轮播
import SwiperTest from  './js/SwiperTest';

// 透明度动画
import FadeInExample from './js/animate/FadeInExample';
// 缩放动画
import ScaleExample from './js/animate/ScaleExample';
// 缩放、平移、旋转动画
import TransformBounceExample from './js/animate/TransformBounceExample';
// 混合动画
import CompositeExample from './js/animate/CompositeExample';

import ShadowTest from './js/ShadowTest';

import ButtonExample from './js/ButtonExample';

// react native 库自带的Modal
import ModalExample1 from './js/dialog/ModalExample1';
import ModalExample2 from './js/dialog/ModalExample2';
// react-native-modalbox 的Modal
import ModalExample3 from './js/dialog/ModalExample3';

import ModalTest from './js/dialog/ModalTest'

// 触碰滚动
import BallTest from './js/touch/BallTest';

import PanResponderMazouri from './js/touch/PanResponderMazouri';

import TouchTest from './js/touch/TouchTest';

// 由于没有对应的IOS原生代码，先注释
// // Native代码测试(简单的原生模块代码调用)
// import NativeTest from './js/NativeTest';
// // Native代码测试（一个详细的原生模块）
// import NativeTest2 from './js/NativeTest2';

// 联系人
import LetterList from './js/nativemodule/Contacts';
import LottieAnimatedExample from './js/LottieAnimatedExample';

// 下拉视图
import ParallaxTest from './js/ParallaxTest';
import Talks from './js/Talks';

// 下拉滚动视图的弹性头部
import ParallaxViewTest from './js/ParallaxViewTest';


AppRegistry.registerComponent('SimpleApp', () => MainTest);

