import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import Picture from './../../components/Picture';

function GuideDetailPage(props) {
  const background = require('../../../assets/background-iphone14.png');
  const arrowImg = require('../../assets/sample/picture/arrow.png');
  const image = props.route.params.image;
  const btnPress = () => {
    Alert.alert('준비중이예요');
  };
  const drawingPress = () => {
    props.navigation.navigate('DrawingPage', { image: image });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.guideImgContainer}>
          <Picture uri={image}></Picture>
        </View>
        <ScrollView style={styles.guideBtnContainer}>
          <Pressable style={styles.detailBtn} onPress={drawingPress}>
            <View style={styles.squareBlue}></View>
            <Text style={styles.detailBtnText}>도면보기</Text>
            <Image style={styles.arrowImg} source={arrowImg}></Image>
          </Pressable>
          <Pressable style={styles.detailBtn} onPress={btnPress}>
            <View style={styles.squareGreen}></View>
            <Text style={styles.detailBtnText}>사진 변경하기</Text>
            <Image style={styles.arrowImg} source={arrowImg}></Image>
          </Pressable>
          <Pressable style={styles.detailBtn} onPress={btnPress}>
            <View style={styles.squareRed}></View>
            <Text style={styles.detailBtnText}>일기 쓰기</Text>
            <Image style={styles.arrowImg} source={arrowImg}></Image>
          </Pressable>
          <Pressable style={styles.detailBtn} onPress={btnPress}>
            <View style={styles.squareOrange}></View>
            <Text style={styles.detailBtnText}>설정</Text>
            <Image style={styles.arrowImg} source={arrowImg}></Image>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guideImgContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBtnContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
  },
  description: {
    fontsize: 15,
    color: '#5A5A5A',
    marginTop: 12,
  },
  detailBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 95,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    elevation: 3,
    backgroundColor: 'white',
  },
  detailBtnText: {
    fontSize: 18,
    color: '#212121',
  },
  itemContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  squareRed: {
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    backgroundColor: '#F3643A',
    width: 95,
    height: 95,
  },
  squareOrange: {
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    backgroundColor: '#FF9A00',
    width: 95,
    height: 95,
  },
  squareGreen: {
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    backgroundColor: '#B3CD36',
    width: 95,
    height: 95,
  },
  squareBlue: {
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    backgroundColor: '#0062D4',
    width: 95,
    height: 95,
  },
  arrowImg: {
    textAlign: 'center',
  },
});

export default GuideDetailPage;
