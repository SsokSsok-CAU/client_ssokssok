import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ImageView(props) {
  const detailPicture = () => {
    props.navigation.navigate('GuideDetailPage', {
      image: props.uri,
    });
  };
  return (
    <TouchableOpacity onPress={detailPicture}>
      <Image
        //source={props}
        style={styles.image}
        source={{ uri: props.uri }}
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
    resizeMode: 'contain',
  },
});

export default ImageView;
