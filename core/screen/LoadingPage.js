import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function LoadingPage() {
	return (
		<View style={styles.container}>
			<Text>Loading...</Text>
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

export default LoadingPage;
