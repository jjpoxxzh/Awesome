import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class PropTest2 extends Component {

    render() {
        return (
            <View style={styles.cotainer}>
                <Text style={styles.tv1}>大圣</Text>
                <Text style={styles.tv2}>大圣爷</Text>
                <Text style={styles.tv3}>齐天大圣</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e7e7e7',
    },
    tv1: {
        flex: 1,
        backgroundColor: '#FFAC69',
        textAlign: 'center',		// 水平居中
        textAlignVertical: 'center',		// 垂直居中
    },
    tv2: {
        flex: 1,
        backgroundColor: '#F08176',
    },
    tv3: {
        flex: 1,
        backgroundColor: '#6CCBC7',
    }

});
