import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { API } from '../configs/axios';
import { storage } from '../configs/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

function FetchTest(props) {
  const [image, setImage] = useState(null);
  const APIfetch = async () => {
    try {
      const form_data = new FormData();
      form_data.append('filename', 'char3.png');
      const response = await API.post('/image/processing', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const imageFetch = async () => {
    const starsRef = ref(storage, 'convertImgchar3.png');

    getDownloadURL(starsRef)
      .then((url) => {
        setImage(url);
        console.log(image);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };
  useEffect(() => {
    APIfetch();
    imageFetch();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.guideTitleContainer}></View>
      <Image style={styles.image} source={{ uri: image }}></Image>

      <View style={styles.guideImgContainer}></View>
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
    flex: 5,
    backgroundColor: '#FCDE02',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  guideImgContainer: {
    flex: 7,
    backgroundColor: '#FCDE02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBtnContainer: {
    flex: 4,
    backgroundColor: '#FCDE02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  image: { width: 300, height: 300 },
});

export default FetchTest;
