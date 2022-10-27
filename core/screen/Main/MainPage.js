import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Picture from "../../components/Picture";
import Album from "../../components/Album";

function MainPage() {
	return (
		<View style={styles.container}>
			<Album />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MainPage;
