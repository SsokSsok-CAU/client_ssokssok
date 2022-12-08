import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { storage } from './../../configs/firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import GuidePicture from './../../components/GuidePicture';

function GuideMainPage(props) {
  const image = require('../../../assets/background-iphone14.png');
  const [isUploading, setIsUploading] = useState(false);
  const [isAllowUpload, setIsAllowUpload] = useState(false);
  const [isFinishGuide, setIsFinishGuide] = useState(false);
  const [pics, setPics] = useState(null);
  const getPicture = async () => {
    const itemRef = ref(storage, 'guide/convertGuide.png');
    getDownloadURL(itemRef).then((url) => setPics(url));
  };
  const upload = async () => {
    setIsUploading(true);
    getPicture();
    setTimeout(() => {
      setIsAllowUpload(false);
      setIsFinishGuide(true);
      setIsUploading(false);
    }, 2000);
  };

  const start = () => {
    props.navigation.navigate('MainPage');
  };
  const allowUploadImage = () => {
    setIsAllowUpload(true);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.guideTitleContainer}>
          {isFinishGuide ? (
            <>
              <Text style={styles.title}>사진을 클릭해보세요!</Text>
              <Text style={styles.description}>완성했어요!</Text>
            </>
          ) : (
            <>
              {isUploading ? (
                <>
                  <Text style={styles.title}>도면을 만드는 중이예요!</Text>
                  <Text style={styles.description}>
                    용량에 따라 시간이 더 걸릴 수 있어요.
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>도면을 만들어볼까요?</Text>
                  <Text style={styles.description}>사진을 선택해 보세요!</Text>
                </>
              )}
            </>
          )}
        </View>
        <View style={styles.guideImgContainer}>
          {isFinishGuide ? (
            <GuidePicture
              navigation={props.navigation}
              uri={pics}
            ></GuidePicture>
          ) : (
            <GuidePicture
              isUploading={isUploading}
              allowUploadImage={allowUploadImage}
            ></GuidePicture>
          )}
        </View>
        <View style={styles.guideBtnContainer}>
          {isAllowUpload && !isUploading ? (
            <Pressable style={styles.buttonUpload} onPress={upload}>
              <Text style={styles.buttonUploadText}>업로드하기</Text>
            </Pressable>
          ) : null}
          {isFinishGuide ? (
            <Pressable style={styles.buttonUpload} onPress={start}>
              <Text style={styles.buttonUploadText}>시작하러가기</Text>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guideTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  guideImgContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  buttonUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width: 280,
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonUploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
});

export default GuideMainPage;
