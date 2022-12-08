import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { API } from '../configs/axios';
import { storage } from '../configs/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function ConvertPage(props) {
  const [image, setImage] = useState(props.route.params.image);
  const [loading, setLoading] = useState(true);
  const convertTitle =
    'convertImage/' + image.split('Image%2F')[1].split('.')[0] + '.png';
  const getDrawing = async () => {
    setLoading(true);
    const itemRef = ref(storage, convertTitle);
    getDownloadURL(itemRef)
      .then((url) => {
        setImage(url);
      })
      .then(setLoading(false));
  };
  useEffect(() => {
    getDrawing();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.guideTitleContainer}></View>
      <View style={styles.guideImgContainer}>
        {loading ? (
          <Image source={require('../assets/guide/loading.gif')}></Image>
        ) : (
          <Image style={styles.image} source={{ uri: image }}></Image>
        )}
      </View>
      <View style={styles.guideBtnContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCDE02',
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
