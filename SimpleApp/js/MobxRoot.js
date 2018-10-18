import React, { Component } from 'react';

import { Provider } from "mobx-react";
import store from "./store";

// Mobx生命周期测试(属性与状态变更)
import LifeCycleMobxTest from './LifeCycleMobxTest';

/**
 * 由于需要给使用Mobx的组件包装根配置项，所以创建此文件作为根组件
 */
export default class MobxRoot extends Component {

    render() {

        return (
            <Provider {...store}>
                <LifeCycleMobxTest />
            </Provider>
        );
    }

}
