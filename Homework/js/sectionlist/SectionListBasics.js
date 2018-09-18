import React, {Component} from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    View
} from 'react-native';

/**
 * SectionList：可处理分组数据，支持分出的区块有标题
 */
export default class SectionListBasics extends Component {

    constructor(props) {
        super(props);
        this.listData = [
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        ];
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.listData}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
