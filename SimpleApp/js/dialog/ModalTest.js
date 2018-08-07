import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ModalTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelVisable: false,
        };
        this.SetTimeName = 0;
        this.set = this.set1.bind(this);
    }


    componentDidMount() {
        this.set1();
        //this.refs.modal1.open();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    set1() {
        this.timer = setInterval(() => {
            if (this.state.modelVisable == false) {
                this.setState({
                    modelVisable: true
                });
            } else {
                this.setState({
                    modelVisable: false
                });
            }
        }, 500);
    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{width: width, height: 300, backgroundColor: "red"}}>
                    <TouchableOpacity style={{flex: 1}}><Text>原视图</Text></TouchableOpacity>
                </View>
                <Modal
                    style={{flex: 1, justifyContent: 'center'}}
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modelVisable}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}>
                    <View style={{width: width, height: 100, backgroundColor: '#ebebeb'}}>
                        <Text>我是Modal</Text>
                    </View>
                </Modal>
            </View>

        )
    }
}
