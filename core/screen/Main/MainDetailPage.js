import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  ScrollView,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { API } from './../../configs/axios';
import Picture from '../../components/Picture';
import { user, image } from '../../store';
import { useSnapshot } from 'valtio';
import { useState } from 'react';

function MainDetailPage(props) {
  const arrowImg = require('../../assets/sample/picture/arrow.png');
  const imageUri = props.route.params.image;
  const [converting, setConverting] = useState(true);
  const imageTitle = imageUri.split('Image%2F')[1].split('.')[0];
  const snapImage = useSnapshot(image);
  const getPic = async () => {
    try {
      const response = await API.get('image/getfile/afterConvert', {
        params: { filename: `${imageTitle}.png` },
        headers: {
          Authorization: user.token,
        },
      });
      image.convertUrl = response.data;
      image.title = imageTitle;
      image.originalUrl = imageUri;
      image.converting = false;
    } catch (e) {
      image.converting = true;
      console.log(e);
    }
  };

  const getColoring = async () => {
    try {
      const responsec = await API.get('image/getfile/Coloring', {
        params: { filename: `${imageTitle}.svg` },
        headers: {
          Authorization: user.token,
        },
      });
      image.svgUrl = responsec.data;
      image.title = imageTitle;
      image.originalUrl = imageUri;
    } catch (e) {
      console.log(e);
    }
  };
  const btnPress = () => {
    Alert.alert('준비중이예요');
  };
  const drawingPress = () => {
    props.navigation.navigate('PaintPage');
  };
  const convertPress = () => {
    props.navigation.navigate('ConvertPage');
  };
  useEffect(() => {
    getPic();
    //getColoring();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.guideImgContainer}>
        <Picture uri={imageUri}></Picture>
      </View>
      <ScrollView style={styles.guideBtnContainer}>
        <Pressable style={styles.detailBtn} onPress={convertPress}>
          <View style={styles.squareBlue}></View>
          <Text style={styles.detailBtnText}>도면 보러 가기</Text>
          <Image style={styles.arrowImg} source={arrowImg}></Image>
        </Pressable>
        <Pressable style={styles.detailBtn} onPress={drawingPress}>
          <View style={styles.squareGreen}></View>
          <Text style={styles.detailBtnText}>그림 그리러 가기</Text>
          <Image style={styles.arrowImg} source={arrowImg}></Image>
        </Pressable>
        <Pressable style={styles.detailBtn} onPress={btnPress}>
          <View style={styles.squareGray}></View>
          <Text style={styles.detailBtnText}>이름 바꾸기</Text>
          <Image style={styles.arrowImg} source={arrowImg}></Image>
        </Pressable>
        <Pressable style={styles.detailBtn} onPress={btnPress}>
          <View style={styles.squareOrange}></View>
          <Text style={styles.detailBtnText}>일기 쓰러 가기</Text>
          <Image style={styles.arrowImg} source={arrowImg}></Image>
        </Pressable>
        <Pressable style={styles.detailBtn} onPress={btnPress}>
          <View style={styles.squareRed}></View>
          <Text style={styles.detailBtnText}>삭제하기</Text>
          <Image style={styles.arrowImg} source={arrowImg}></Image>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCDE02',
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
    fontSize: '20em',
    marginRight: 80,
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
    backgroundColor: 'red',
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
  squareGray: {
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    backgroundColor: '#A9A9A9',
    width: 95,
    height: 95,
  },
  arrowImg: {
    textAlign: 'center',
    marginRight: 20,
  },
});

export default MainDetailPage;
