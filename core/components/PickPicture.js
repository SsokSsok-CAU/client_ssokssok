import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

function PickPicture(props) {
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		// const uploadImage = async (uri) => {
		// 	const response = await fetch(uri);
		// 	const blob = await response.blob();
		// 	var ref = myApp.storage().ref().child("my-image");
		// 	return ref.put(blob);
		// };
		if (!result.cancelled) {
			setImage(result.uri);
			//uploadImage(result.uri);
		}
	};

	//TODO
	return (
		<View>
			<TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
				<Image source={require("../assets/sample/picture/add.png")} />
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
});

export default PickPicture;
