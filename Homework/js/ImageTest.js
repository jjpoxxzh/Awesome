import React, {Component} from 'react';
import {
    AppRegistry,
    Button,
	Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';


 // source={require('./img/logo_og.png')}
export default class ImageApp extends Component {
	 render() {
		 return (
        <View style={[styles.horizontal,{backgroundColor:'#ebebeb'}]}>
          <Image
            style={[styles.base, {borderRadius: 5, fillOpacity:0.5}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {borderRadius: 19}]}
            source={fullImage}
          />
        </View>

		 );
	 }
 }

var fullImage = {uri: 'https://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'https://facebook.github.io/react/img/logo_small_2x.png'};

const styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  },
  gif: {
    flex: 1,
    height: 200,
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
  touchableText: {
    fontWeight: '500',
    color: 'blue',
  },
});