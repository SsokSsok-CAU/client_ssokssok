import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import { useState, useEffect } from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import { image } from './../store';

function ConvertPage(props) {
  console.log(image.converting);
  return (
    <View style={styles.container}>
      <View style={styles.guideTitleContainer}></View>
      <ImageZoom
        cropWidth={Dimensions.get('screen').width}
        cropHeight={Dimensions.get('screen').height}
        imageWidth={Dimensions.get('screen').width}
        imageHeight={Dimensions.get('screen').width}
        panToMove={true}
        enableDoubleClickZoom={true}
        enableSwipeDown={false}
        enableCenterFocus={true}
      >
        <View style={styles.guideImgContainer}>
          {image.converting ? (
            <Image source={require('../assets/guide/loading.gif')}></Image>
          ) : (
            <Image
              style={styles.image}
              source={{ uri: image.convertUrl }}
              //source={{ uri: image.svgUrl }}
            ></Image>
          )}
        </View>
      </ImageZoom>
      <View style={styles.guideBtnContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideTitleContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  guideImgContainer: {
    flex: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBtnContainer: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

export default ConvertPage;
