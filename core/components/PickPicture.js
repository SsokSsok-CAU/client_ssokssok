import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, TouchableOpacity, View, Image, Alert,Text } from "react-native";
import {firebase} from './../configs/firebaseConfig';

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

		if (!result.canceled) {
			setImage(result.assets[0]);
      props.allowUploadImage();
		}
	};
  
  const uploadImage = async () => {
    setUploading(true);
    
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = 'photo.jpg'
    image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    
    try {
        await ref;
    } catch (e) {
        console.log(e);
    }
    setUploading(false);
    Alert.alert(
        'Photo uploaded!!'
    );
    setUploading(true);
    setImage(null);
};

	//TODO
	return (
		<View style={styles.imagePicker}>
			<TouchableOpacity onPress={pickImage} >
      {image ? 
          <Image style={styles.image} source={{ uri: image.uri }}></Image>
      :
        <Image style={styles.image}
        source={require("../assets/sample/picture/add.png")} />
      }
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	imagePicker: {
		justifyContent: "center",
		alignContent: "center",
		resizeMode: "cover",
	},
  image: {
		justifyContent: "center",
		alignContent: "center",
    borderRadius: 20,
    marginBottom:10,
		width: 230,
		height: 280,
  },
});

export default PickPicture;
