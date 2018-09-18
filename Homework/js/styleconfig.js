import {
    Platform,
    PixelRatio,
    StatusBar,
    Dimensions,
} from 'react-native';

export const screen = Dimensions.get('window');
const basePx = 375;

export function px2dp(px) {
    return px * screen.width / basePx;
}

export function getSomeText() {
    let value = parseInt(Math.random() * 10 + 1); // 取[1,10)的随机数
    let strTemp = "";
    switch (value) {
        case 1:
            strTemp = "阿里巴巴";
            break;
        case 2:
            strTemp = "阿里-巴巴";
            break;
        case 3:
            strTemp = "京-东";
            break;
        case 4:
            strTemp = "京东";
            break;
        case 5:
            strTemp = "唯品-会";
            break;
        case 6:
            strTemp = "唯品会";
            break;
        case 7:
            strTemp = "警察叔叔";
            break;
        case 8:
            strTemp = "警察";
            break;
        default:
            strTemp = "小偷";
    }
    return strTemp;
}

export const TAG = 'SimpleApp'

// 状态栏：ios固定为20，android算出来应该是25或26
export var statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20

export const color_1 = '#FFAC69'
export const color_2 = '#F08176'
export const color_3 = '#6CCBC7'
export const color_4 = '#CD8CC0'
export const color_5 = '#6FA9CE'
export const color_6 = '#85B979'
export const color_7 = '#A58F8F'
