import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

function LoadingPicture(props) {
  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require('../assets/guide/loading.gif')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    justifyContent: 'center',
    alignContent: 'center',
    resizeMode: 'cover',
  },
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    width: 50,
  },
});

export default LoadingPicture;
