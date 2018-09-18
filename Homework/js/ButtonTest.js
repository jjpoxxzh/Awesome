import React, {Component} from 'react';
import {
    AppRegistry,
    Alert,
    Button,
    PixelRatio,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';


/*
 *  按扭的使用，包括圆角矩形的定义
 */

const onPressLearnMore = () => {
    Alert.alert('Button has been pressed!');
};

var str1 = 'The title and onPress handler are required. It is ' +
    'recommended to set accessibilityLabel to help make your app usable by ' +
    'everyone.';
var str2 = 'Adjusts the color in a way that looks standard on each ' +
    'platform. On iOS, the color prop controls the color of the text. On ' +
    'Android, the color adjusts the background color of the button.';
var str3 = 'This layout strategy lets the title define the width of ' +
    'the button';
var str4 = 'All interactions for the component are disabled.';

export default class ButtonTest extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.childcontainer_1}>
                    <View style={styles.childcontainer_2}>
                        <Text style={styles.tv1}>Simple Button</Text>
                        <Text style={styles.tv2}>{str1}</Text>
                    </View>
                    <View style={styles.childcontainer_3}>
                        <Button
                            onPress={onPressLearnMore}
                            title="Press Me"
                            color="#1f96f2"
                            accessibilityLabel="See an informative alert"
                        />
                    </View>
                </View>

                <View style={styles.childcontainer_1}>
                    <View style={styles.childcontainer_2}>
                        <Text style={styles.tv1}>Adjusted color</Text>
                        <Text style={styles.tv2}>{str2}</Text>
                    </View>
                    <View style={styles.childcontainer_3}>
                        <Button
                            onPress={onPressLearnMore}
                            title="Press Purple"
                            color="#841584"
                            accessibilityLabel="Learn more about purple"
                        />
                    </View>
                </View>

                <View style={styles.childcontainer_1}>
                    <View style={styles.childcontainer_2}>
                        <Text style={styles.tv1}>Fit to text layout</Text>
                        <Text style={styles.tv2}>{str3}</Text>
                    </View>
                    <View style={styles.childcontainer_4}>
                        <Button
                            onPress={onPressLearnMore}
                            title="This looks great!"
                            accessibilityLabel="This sounds great!"
                        />
                        <Button
                            onPress={onPressLearnMore}
                            title="Ok!"
                            color="#841584"
                            accessibilityLabel="Ok, Great!"
                        />
                    </View>
                </View>

                <View style={styles.childcontainer_1}>
                    <View style={styles.childcontainer_2}>
                        <Text style={styles.tv1}>Disabled Button</Text>
                        <Text style={styles.tv2}>{str4}</Text>
                    </View>
                    <View style={styles.childcontainer_3}>
                        <Button
                            disabled
                            onPress={onPressLearnMore}
                            title="I Am Disabled"
                            color="#1f96f2"
                            accessibilityLabel="See an informative alert"
                        />
                    </View>
                </View>

            </View>
        );
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9eaec',
        paddingRight: 6,
        paddingLeft: 6,
        paddingTop: 6,
        justifyContent: 'space-between',
    },
    childcontainer_1: {
        backgroundColor: 'white',
        borderColor: '#d6d7d9',
        borderRadius: 4,
        borderWidth: (Platform.OS === 'ios' ? 1.0 : 1.5) / PixelRatio.get(),
    },
    childcontainer_2: {
        padding: 6,
        borderTopLeftRadius: 4,
        backgroundColor: '#f5f7f6',
    },
    childcontainer_3: {
        padding: 10,
        borderTopRightRadius: 4,
    },
    childcontainer_4: {
        padding: 10,
        borderTopRightRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tv1: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',

    },
    tv2: {
        fontSize: 14,
        color: 'black',
        backgroundColor: '#f5f7f6',
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },

    red: {
        color: 'red',
    }
});