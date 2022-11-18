import React from 'react';
import ImageView from './ImageView';
import LoadingPicture from './LoadingPicture';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GuidePickPicture from './GuidePickPicture';

function GuidePicture(props) {
  const allowUploadImage = () => {
    props.allowUploadImage();
  };
  return (
    <View style={styles.pictureBoard}>
      <View style={styles.imageBoard}>
        <>
          {props.isUploading ? (
            <LoadingPicture></LoadingPicture>
          ) : (
            <>
              {props.uri == undefined ? (
                <GuidePickPicture
                  navigation={props.navigation}
                  allowUploadImage={allowUploadImage}
                />
              ) : (
                <ImageView navigation={props.navigation} uri={props.uri} />
              )}
            </>
          )}
        </>
      </View>
      <View style={styles.imageNameBoard}>
        <>
          {props.isUploading ? null : (
            <>
              {props.uri == undefined ? (
                <Text style={styles.imageName}>사진을 선택하세요</Text>
              ) : (
                <Text style={styles.imageName}>
                  {props.uri.split('Image%2F')[1].split('.')[0]}
                </Text>
              )}
            </>
          )}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pictureBoard: {
    width: 280,
    height: 380,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
  },
  imageBoard: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageNameBoard: {
    marginTop: 10,
  },
  imageName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5A5A5A',
  },
});

export default GuidePicture;
