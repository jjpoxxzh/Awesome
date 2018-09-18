import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

/*
 *  输入文本
 *  通过状态来保存输入的信息
 *  在setState方法内使用{}来设置属性，参数必须与对应的状态名一致。此处为text，也可以改成其他的名称
 */
class TextDemo1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    getTip() {
        return "Type here to translate!";
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder={this.getTip()}
                    value={this.state.text}
                    onChangeText={text => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 20, backgroundColor: '#bebebe'}}>
                    {this.state.text}
                </Text>
                <Text style={{padding: 10, fontSize: 42, backgroundColor: '#ebebeb'}}>
                    {this.state.text.split(' ').map(word => word && '*').join(' ')}
                </Text>
            </View>
        );
    }
}


class TextDemo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            // 为什么最顶层视图，如果flex与backgroundColor一起用就不显示，而height与backgroundColor一起用就显示。是因为外层有flex
            <View >
                <View style={{flexDirection: 'row', height: 45}}>
                    <TextInput
                        style={textstyles.input}
                        returnKeyType="search"
                        placeholder="请输入关键字"
                        underlineColorAndroid='transparent' //设置下划线背景色透明，达到去掉下划线的效果
                        onChangeText={(text) => this.setState({text})}
                        ref={(textInput) => {
                            this.textInput = textInput;
                        }}/>
                    <Text style={[textstyles.search, {marginRight: 1}]} onPress={() => {
                        this.textInput.clear();
                        this.setState({text: ''});
                    }}>清空</Text>
                    <Text style={textstyles.search} onPress={this.search.bind(this)}>搜索</Text>
                </View>
                <Text style={textstyles.tip}>已输入{this.state.text.length}个文字</Text>
            </View>
        );
    }

    search() {
        alert("您输入的内容为：" + this.state.text);
    }
}


class TextDemo3 extends Component {

    constructor(props) {
        super(props);
        this.state = {text: '请输入关键字', visible: true};
    }

    render() {
        return (
            <View >
                {this.state.visible && <View style={{flexDirection: 'row', height: 45}}>
                    <TextInput
                        style={textstyles.input}
                        returnKeyType="search"
                        placeholder={this.state.text}
                        placeholderTextColor='#cccccc'
                        underlineColorAndroid='transparent' //设置下划线背景色透明，达到去掉下划线的效果
                        ref={(textInput) => {
                            this.textInput = textInput;
                        }}/>
                    <Text style={[textstyles.search, {marginRight: 1}]} onPress={() => {
                        this.setState({text: this.state.text + "#"});
                    }}>改变holder</Text>
                </View>}
                <Text style={textstyles.search} onPress={() => {
                    this.setState({visible: !this.state.visible});
                }}>隐藏</Text>
            </View>
        );
    }

    search() {
        alert("您输入的内容为：" + this.state.text);
    }
}

class TextDemo4 extends TextDemo1 {

    getTip() {
        return "我是继承的子类TextInput";
    }

}

export default class TextInputTest extends Component {

    render() {
        return (
            <View style={[{flex: 1, marginTop: 20}, textstyles.topStatus]}>
                <TextDemo1 />
                <TextDemo4 />
            </View>

        );
    }
}


const textstyles = StyleSheet.create({
    topStatus: {
        marginTop: 25,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    search: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#23BEFF',
        width: 55,
        marginRight: 5,
    },
    tip: {
        marginLeft: 5,
        marginTop: 5,
        fontSize: 18,
        color: '#C0C0C0',
    }
});

