import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
//import * as firebase from 'firebase';
import { firebaseConfig } from './firebase-config';

export default function App() {

  // Initialize Firebase
  let myApp = initializeApp(firebaseConfig);

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)

    const uploadImage = async(uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = myApp.storage().ref().child("my-image");
      return ref.put(blob);
    }

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri); 
    }
    //image에 imageURL가 들어가있음
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
