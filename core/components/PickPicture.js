import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Text,
} from 'react-native';
import { firebase, storage } from './../configs/firebaseConfig';

function PickPicture(props) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    try {
      if (!result.canceled) {
        setImage(result.assets[0]);
        props.allowUploadImage();
        uploadImageAsync(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };
  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const metadata = {
      contentType: 'image/png',
    };
    const fileRef = ref(getStorage(), 'Image/guide.png');
    const result = await uploadBytes(fileRef, blob, metadata);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }
  //TODO
  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image style={styles.image} source={{ uri: image.uri }}></Image>
        ) : (
          <Image
            style={styles.image}
            source={require('../assets/sample/picture/add.png')}
          />
        )}
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
    width: 230,
    height: 280,
  },
});

export default PickPicture;
