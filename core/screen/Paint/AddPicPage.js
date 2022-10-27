import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Text, Image } from "react-native";

function AddPicPage(props) {
	return (
		<Image
			style={styles.imagePicker}
			source={require("../assets/sample/picture/add.png")}
		></Image>
	);
}

const styles = StyleSheet.create({
	imagePicker: {
		width: 230,
		height: 280,
		justifyContent: "center",
		alignContent: "center",
		resizeMode: "cover",
	},
});

export default AddPicPage;
