import React from "react";
import { StyleSheet, View, Text, Image, Button, Pressable ,Alert, Dimensions, TouchableOpacity} from "react-native";
import {useState, useEffect} from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

function GuidePage(props) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const sliderWidth = Dimensions.get('window').width;

  const guideProps = [{
    "title" : "색칠쏙쏙",
    "description" : "원하는 사진을 그림도면으로 만들어보세요!",
    "uri": require('../../assets/guide/guide0.png'),
  },
  {
    "title" : "만들어봐요",
    "description" : "사진을 도면으로 만들어보세요!",
    "uri": require('../../assets/guide/guide1.png'),
  },
  {
    "title" : "함께 색칠해요",
    "description" : "도면을 같이 색칠하고 공유해요!",
    "uri": require('../../assets/guide/guide2.png'),
  }];

  const _renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.itemImage} source={item.uri}></Image>
      </View>
    );
  }
  const [entries, activeSlide] = useState(0);
  const start = () =>{
    props.navigation.navigate('GuideMainPage');
  }
  const signUp = () => {
    Alert.alert("signup");
  }
	return (
    <View style={styles.container}>
      <View style={styles.guideTitleContainer}>
        <Text style={styles.title}>
          {guideProps[entries].title}
          </Text>
        <Text style={styles.description}>{guideProps[entries].description}</Text>
      </View>
      <View style={styles.guideImgContainer}>
        <Carousel
          data={guideProps}
          renderItem={_renderItem}
          pageWidth={screenWidth - (16 + 36) * 2}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
          onSnapToItem={(index) => activeSlide(()=>index) }
          pagingEnabled={true}
        />
        <Pagination
          dotsLength={guideProps.length}
          activeDotIndex={entries}>
        </Pagination>
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

export default GuidePage;