import React from "react";
import { StyleSheet, View, Text, Image, Button, Pressable ,Alert, Dimensions, TouchableOpacity} from "react-native";
import {useState, useEffect} from 'react';

function PicDetailPage(props) {
  const start = () =>{
    Alert.alert("start");
  }
  const signUp = () => {
    Alert.alert("signup");
  }
	return (
    <View style={styles.container}>
      <View style={styles.guideTitleContainer}>
        <Text style={styles.title}>
          </Text>
        <Text style={styles.description}></Text>
      </View>
      <View style={styles.guideImgContainer}>
      </View>
      <View style={styles.guideBtnContainer}>
      <Pressable style={styles.buttonStart} onPress ={start}>
        <Text style={styles.buttonStartText}>색칠쏙쏙 시작하기</Text>
      </Pressable>
      <Pressable style={styles.buttonSign} onPress ={signUp}>
        <Text style={styles.buttonSignText}>회원가입</Text>
      </Pressable>
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FCDE02",
		alignItems: "center",
		justifyContent: "center",
	},
  guideTitleContainer: {
		flex: 5,
		backgroundColor: "#FCDE02",
		alignItems: "center",
		justifyContent: "flex-end",
	},
  guideImgContainer: {
		flex: 7,
		backgroundColor: "#FCDE02",
		alignItems: "center",
		justifyContent: "center",
	},
  guideBtnContainer: {
		flex: 4,
		backgroundColor: "#FCDE02",
		alignItems: "center",
		justifyContent: "center",
	},
  title:{
    fontSize:32,
    fontWeight:'bold',
    color:'#212121',
  },
  description:{
    fontsize:15,
    color:'#5A5A5A',
    marginTop:12,
  },
  buttonStart:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width:310,
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonSign:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FCDE02',
  },
  buttonStartText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonSignText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0062D4',
  },
  itemContainer:{
		alignItems: "center",
    height:'100%',
    justifyContent:"center",
  },
  itemImage:{
  }
});

export default PicDetailPage;