import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class LayoutTest extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>FlexBox布局</Text>
                <View style={styles.container}>
                    <View style={styles.box1}/>
                    <View style={[styles.box2]}/>
                    <View style={[styles.box3]}/>
                </View>
                <Text>相对布局（relative）</Text>
                <View style={[styles.container, {flexDirection: 'column'}]}>
                    <View style={styles.box1}/>
                    <View style={[styles.box2, {position: 'relative', marginLeft: 50, marginTop: 50,}]}></View>
                    <View style={[styles.box3, {position: 'relative'}]}/>
                </View>
                <Text>绝对布局（absolute）</Text>
                <View style={[styles.container, {flexDirection: 'column'}]}>
                    <View style={styles.box1}/>
                    <View style={[styles.box2, {position: 'absolute', top: 50, left: 25,}]}></View>
                    <View style={[styles.box3, {position: 'absolute', bottom: 0, right: 0}]}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#CCCCCC', marginBottom: 10,},
    box1: {width: 50, height: 50, backgroundColor: '#FF0000'},
    box2: {width: 50, height: 50, backgroundColor: '#00FF00'},
    box3: {width: 50, height: 50, backgroundColor: '#0000FF'}
});
