import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Album from '../../components/Album';
import { useState, useEffect } from 'react';
import { storage } from '../../configs/firebaseConfig';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { Pressable } from 'react-native';

function MainPage(props) {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPicture = async () => {
    setPics([]);
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
  const goHome = () => {
    props.navigation.navigate('GuidePage');
  };
  useEffect(() => {
    getPicture();
  }, []);
  const background = require('../../../assets/background-iphone14.png');
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.MainTitleContainer}>
          <Text style={styles.title}>성오님의 앨범이예요!</Text>
          <Text style={styles.description}>도면을 클릭해봐요!</Text>
        </View>
        <View style={styles.AlbumContainer}>
          {loading ? (
            <Image
              style={styles.loading}
              source={require('../../assets/guide/loading.gif')}
            ></Image>
          ) : (
            <Album pics={pics} navigation={props.navigation} />
          )}
        </View>
        <View style={styles.footContainer}>
          <Pressable style={styles.buttonHome} onPress={goHome}>
            <Text style={styles.buttonHomeText}>HOME</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  footContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  loading: {},
  buttonHome: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width: '90%',
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonHomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default MainPage;
