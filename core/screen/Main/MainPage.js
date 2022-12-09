import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Alert } from 'react-native';
import Album from '../../components/Album';
import { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { user, images, image } from '../../store';
import { useSnapshot } from 'valtio';
import { API } from './../../configs/axios';

function MainPage({ navigation, route }, props) {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const snapImages = useSnapshot(images);
  const snapImage = useSnapshot(image);

  const getPics = async () => {
    setPics([]);
    setLoading(true);
    try {
      const response = await API.get('image/myfiles/beforeConvert', {
        headers: {
          Authorization: user.token,
        },
      });
      response.data.map((el) => {
        setPics((pics) => [el[1], ...pics]);
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const getPicsSnap = async () => {
    setLoading(true);
    try {
      const response = await API.get('image/myfiles/groupby', {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const goHome = () => {
    Alert.alert(
      '로그아웃 할까요?',
      '정말루?',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        { text: '네', onPress: () => navigation.navigate('GuidePage') },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    getPics();
    //getPicsSnap();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.MainTitleContainer}>
        <Text style={styles.title}>{user.displayName}님의 앨범이에요!</Text>
        <Text style={styles.description}>도면을 클릭해봐요!</Text>
      </View>
      <View style={styles.AlbumContainer}>
        {loading ? (
          <Image
            style={styles.loading}
            source={require('../../assets/guide/loading.gif')}
          ></Image>
        ) : (
          <Album pics={pics} navigation={navigation} />
        )}
      </View>
      <View style={styles.footContainer}>
        <Pressable style={styles.buttonHome} onPress={goHome}>
          <Text style={styles.buttonHomeText}>로그아웃하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCDE02',
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
    width: Dimensions.get('window').width / 4,
    elevation: 3,
    backgroundColor: '#0062D4',
  },
  buttonHomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MainPage;
