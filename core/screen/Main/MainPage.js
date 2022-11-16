import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Picture from '../../components/Picture';
import Album from '../../components/Album';

function MainPage(props) {
  const background = require('../../../assets/background-iphone14.png');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.MainTitleContainer}>
          <Text style={styles.title}>메인화면 텍스트예요!</Text>
          <Text style={styles.description}>도면을 클릭해봐요!</Text>
        </View>
        <View style={styles.AlbumContainer}>
          <Album navigation={props.navigation} />
        </View>
        <View style={styles.footContainer}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainTitleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  AlbumContainer: {
    flex: 8,
  },
  footContainer: {
    flex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
  },
  description: {
    fontsize: 15,
    color: '#5A5A5A',
    marginTop: 12,
  },
});

export default MainPage;
