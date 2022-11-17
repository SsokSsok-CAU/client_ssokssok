import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ImageView(props) {
  const dummyImg = require('../assets/sample/picture/pic2.png');
  const detailPicture = () => {
    props.navigation.navigate('GuideDetailPage', {
      image: dummyImg,
    });
  };
  return (
    <TouchableOpacity onPress={detailPicture}>
      <Image
        //source={props}
        style={styles.image}
        source={dummyImg}
      ></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 280,
    justifyContent: 'center',
    alignContent: 'center',
    resizeMode: 'cover',
  },
});

export default ImageView;
