import React from "react";
import Picture from "./Picture";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";

const SAMPLE_URL = 'require("../assets/sample/picture/';
const tempPictureArray = [
	'pic1.png"',
	'pic2.png"',
	'pic3.png"',
	'pic4.png"',
	'pic5.png"',
];
const emptyPictureArray = [];

function Album() {
	const [pics, setPics] = useState("");
	const getPicture = async () => {
		// getPicture
		// FROM NOW, assets/sample/picture
	};

	useEffect(() => {
		//getPicture();
		//setPics(emptyPictureArray.map((pic) => SAMPLE_URL + pic));
		setPics(tempPictureArray.map((pic) => SAMPLE_URL + pic));
		//setPics(tempPictureArray);
	}, []);
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.album}
		>
			{pics.length === 0
				? null
				: pics.map((pic, index) => (
						<Picture key={index} style={styles.pics} uri={pic} />
				  ))}
			<Picture style={styles.pics} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	album: {
		alignItems: "center",
		justifyContent: "center",
	},
	pics: {
		alignItems: "flex-start",
	},
});

export default Album;
