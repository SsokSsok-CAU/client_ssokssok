import * as React from "react";
import { Button, View, Text, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Picture from "../components/Picture";

// Navigator Practice
// TODO : For Main Navigator & Nesting Navigator

function LogoTitle() {
	return (
		<Image
			style={{ width: 50, height: 50 }}
			source={require("../../assets/icon.png")}
		/>
	);
}

function HomeScreen({ route, navigation }) {
	React.useEffect(() => {
		if (route.params?.post) {
			// Post updated, do something with `route.params.post`
			// For example, send the post to the server
		}
	}, [route.params?.post]);
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() =>
					navigation.navigate("Details", {
						itemId: 86,
						otherParam: "hi",
					})
				}
			/>
			<Button
				title="Create post"
				onPress={() => navigation.navigate("CreatePost")}
			/>
			<Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
			<Picture />
		</View>
	);
}

function DetailsScreen({ route, navigation }) {
	const { itemId, otherParam } = route.params;
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Details Screen</Text>
			<Text>itemId : {JSON.stringify(itemId)}</Text>
			<Text>otherPAram: {JSON.stringify(otherParam)}</Text>
			<Button
				title="Go to Details... again"
				onPress={() =>
					navigation.push("Details", {
						itemId: Math.floor(Math.random() * 100),
						otherParam: otherParam,
					})
				}
			/>
			<Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button
				title="Go back to first screen in stack"
				onPress={() => navigation.popToTop()}
			/>
		</View>
	);
}

function CreatePostScreen({ navigation, route }) {
	const [postText, setPostText] = React.useState("");

	return (
		<>
			<TextInput
				multiline
				placeholder="What's on your mind?"
				style={{ height: 200, padding: 10, backgroundColor: "white" }}
				value={postText}
				onChangeText={setPostText}
			/>
			<Button
				title="Done"
				onPress={() => {
					// Pass and merge params back to home screen
					navigation.navigate({
						name: "Home",
						params: { post: postText },
						merge: true,
					});
				}}
			/>
		</>
	);
}
const Stack = createNativeStackNavigator();

function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
				/>
				<Stack.Screen
					name="Details"
					component={DetailsScreen}
					options={({ route }) => ({
						title: JSON.stringify(route.params.itemId),
					})}
				/>
				<Stack.Screen name="CreatePost" component={CreatePostScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;
