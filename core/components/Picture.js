import React from "react";
import ImageView from "./ImageView";
import PickPicture from "./PickPicture";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Picture(props) {
	return (
		<TouchableOpacity>
			<View style={styles.pictureBoard}>
				<View style={styles.imageBoard}>
					{props.uri == undefined ? (
						<PickPicture />
					) : (
						<ImageView uri={props.uri} />
					)}
				</View>
				<View style={styles.imageNameBoard}>
					{props.uri == undefined ? (
						<Text style={styles.imageName}>Pick your image</Text>
					) : (
						<Text style={styles.imageName}>Image 1</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	pictureBoard: {
		width: 280,
		height: 380,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 15,
		marginRight: 15,
	},
	imageBoard: {
		backgroundColor: "gray",
		alignItems: "center",
		justifyContent: "center",
	},
	imageNameBoard: {
		marginTop: 10,
	},
	imageName: {
		textAlign: "center",
		fontSize: 20,
		color: "white",
	},
});

export default Picture;
