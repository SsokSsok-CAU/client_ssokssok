import React from "react";
import { StyleSheet, View, Text, Pressable ,Alert, ImageBackground} from "react-native";
import {useState, useEffect} from 'react';
import Picture from './../../components/Picture';

function GuideMainPage(props) {
  const [isAllowUpload, setIsAllowUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinishGuide, setIsFinishGuide] = useState(false);
  const image = require("../../../assets/background-iphone14.png");
  const dumpUri = require("../../assets/sample/picture/pic1.png");
  const upload = () =>{
    setIsUploading(true);
    //api for upload instead its time
    setTimeout(()=>{
      setIsUploading(false);
      setIsAllowUpload(false);
      setIsFinishGuide(true);
    },2000)
  }
  const allowUploadImage = () => {
    setIsAllowUpload(true);
  }
	return (
    <View style={styles.container}>
      <ImageBackground 
        source={image} 
        resizeMode="cover"
        style={styles.image}
        >
        <View style={styles.guideTitleContainer}>
          {isFinishGuide ? (
            <>
            <Text style={styles.title}>도면을 클릭해보세요!</Text>
            <Text style={styles.description}>완성했어요!</Text>
            </>
          ) : (
            <>
            {isUploading ?  (
              <>
                <Text style={styles.title}>도면을 만드는 중이예요!</Text>
                <Text style={styles.description}>용량에 따라 시간이 더 걸릴 수 있어요.</Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>도면을 만들어볼까요?</Text>
                <Text style={styles.description}>사진을 선택해 보세요!</Text>
              </>
            )}
          </>
          )}
        </View>
        <View style={styles.guideImgContainer}>
          {isFinishGuide ? 
          <Picture navigation={props.navigation} uri={dumpUri}></Picture>
          : 
          <Picture isUploading={isUploading} allowUploadImage ={allowUploadImage}></Picture>
        }
          </View>
        <View style={styles.guideBtnContainer}>
          {isAllowUpload && !isUploading ? (
            <Pressable style={styles.buttonUpload} onPress ={upload}>
              <Text style={styles.buttonUploadText}>업로드하기</Text>
            </Pressable>
            ) : null
          }
        </View>
      </ImageBackground>
    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
  guideTitleContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
  guideImgContainer: {
		flex: 4,
		alignItems: "center",
		justifyContent: "center",
	},
  guideBtnContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
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
  buttonUpload:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width:280,
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonUploadText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemContainer:{
		alignItems: "center",
    height:'100%',
    justifyContent:"center",
  },
  image:{
    flex: 1,
    justifyContent: "center",
  }
});

export default GuideMainPage;