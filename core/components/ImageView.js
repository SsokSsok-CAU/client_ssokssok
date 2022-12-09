import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

function ImageView(props) {
  const detailPicture = () => {
    props.navigation.navigate('MainDetailPage', {
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
