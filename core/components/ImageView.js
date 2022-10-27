import React from "react";
import { StyleSheet, Image } from "react-native";

function ImageView(props) {
	return (
		<Image
			//source={props}
			style={styles.image}
			source={require("../assets/sample/picture/pic2.png")}
		></Image>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 230,
		height: 280,
		justifyContent: "center",
		alignContent: "center",
		resizeMode: "cover",
	},
});

export default ImageView;
