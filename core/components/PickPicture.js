import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import { Alert } from 'react-native';
import { API } from './../configs/axios';
import { user } from '../store';
import { useSnapshot } from 'valtio';

function PickPicture({ navigation }, props) {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const [loading, setLoading] = useState(false);
  const snapUser = useSnapshot(user);
  const pickImage = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.2,
    });
    try {
      if (!result.canceled) {
        setImage(result.assets[0]);
        setModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  async function uploadImageAsync(uri, text) {
    setLoading(true);
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

    const fileRef = ref(getStorage(), `${snapUser.id}/Image/${text}.png`);
    const result = await uploadBytes(fileRef, blob, metadata);

    // We're done with the blob, close and release it
    blob.close();
    sendAPItoConvert(image.uri, text);
    refreshMainPage();
    setLoading(false);
    return await getDownloadURL(fileRef);
  }
  const refreshMainPage = () => {
    //TODO : REFRESH
    //navigation.push('MainPage');
  };
  const sendAPItoConvert = async (uri, text) => {
    const body = new FormData();
    console.log(`filename : ${text}.png`);
    body.append('filename', `${text}.png`);
    try {
      await API.post('image/processing', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: snapUser.token,
        },
        transformRequest: (formData) => formData,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity onPress={pickImage}>
        {loading ? (
          <Image
            style={styles.loading}
            source={require('../assets/guide/loading.gif')}
          ></Image>
        ) : (
          <>
            {image ? (
              <Image style={styles.image} source={{ uri: image.uri }}></Image>
            ) : (
              <Image
                style={styles.image}
                source={require('../assets/sample/picture/add.png')}
              />
            )}
          </>
        )}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>사진의 제목을 입력해주세요!</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeText}
              value={text}
              placeholder="제목을 입력해주세요!"
            />
            <Pressable
              style={styles.buttonUpload}
              onPress={() => {
                uploadImageAsync(image.uri, text);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>사진올리기!</Text>
            </Pressable>
            <Pressable
              style={styles.buttonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalCloseText}>사진을 다시 고를게요!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonUpload: {
    width: 230,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    elevation: 2,
    backgroundColor: '#0062D4',
  },
  buttonClose: {
    width: 230,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputText: {
    height: 40,
    padding: 10,
    width: 230,
    borderRadius: 20,
    backgroundColor: '#e8e8e8',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseText: {
    color: '#212121',
    textAlign: 'center',
  },
  loading: {},
});

export default PickPicture;
