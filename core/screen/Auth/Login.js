import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function LoginPage() {
	return (
		<View style={styles.container}>
			<Text>Login...</Text>
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

export default LoginPage;
