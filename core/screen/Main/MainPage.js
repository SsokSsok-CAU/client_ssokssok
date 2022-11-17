import React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import Album from '../../components/Album';
import { useState, useEffect } from 'react';
import { storage } from '../../configs/firebaseConfig';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

function MainPage(props) {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPicture = async () => {
    setLoading(true);
    const listRef = ref(storage, 'Image');
    listAll(listRef)
      .then((res) => {
        for (let itemRef of res.items) {
          getDownloadURL(itemRef).then((url) => {
            setPics((pics) => [url, ...pics]);
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getPicture();
  }, []);
  const background = require('../../../assets/background-iphone14.png');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.MainTitleContainer}>
          <Text style={styles.title}>성오님의 앨범이예요!</Text>
          <Text style={styles.description}>도면을 클릭해봐요!</Text>
        </View>
        <View style={styles.AlbumContainer}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Album pics={pics} navigation={props.navigation} />
          )}
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
