import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { state, user } from '../store';
import Util from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as png from '@vivaxy/png';
import DOMParser from 'react-native-html-parser';

const PaintHeader = ({ canvasRef, isDrawing, handleFunction }) => {
  /**
   * Reset the canvas & draw state
   */
  const reset = () => {
    if (isDrawing) {
      handleFunction.handleDraw();
    } else {
      handleFunction.handleZoom();
    }
    canvasRef.current?.reset();
    state.strokeColor = 'black';
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(`${state.imageTitle}`, JSON.stringify(value));
      Alert.alert('저장되었습니다!');
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(`${state.imageTitle}`);
      if (value !== null) {
        const parsePath = JSON.parse(value);
        canvasRef.current?.addPoints(parsePath);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const load = () => {
    getData();
  };
  const save = () => {
    const points = canvasRef.current?.toPoints();
    try {
      storeData(points);
    } catch (e) {
      console.log(e);
    }
  };

  const undo = () => {
    canvasRef.current?.undo();
  };

  const redo = () => {
    canvasRef.current?.redo();
  };

  const exportImg = () => {
    /**
    const image = canvasRef.current?.toSvg(500, 500);
    
    const parser = new DOMParser.DOMParser();
    const doc = parser.parseFromString(image, 'image/svg+xml');
    console.log(doc);
    */
    handleFunction.onCapture();
  };

  async function uploadSvgAsync(svg) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', svg, true);
      xhr.send(null);
    });
    const metadata = {
      contentType: 'image/svg',
    };

    const fileRef = ref(getStorage(), `${user.id}/Svg/${user.displayName}.png`);
    const result = await uploadBytes(fileRef, blob, metadata);

    // We're done with the blob, close and release it
    blob.close();
    return await getDownloadURL(fileRef);
  }

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={undo}
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={redo}
          activeOpacity={0.6}
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>앞으로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={load}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>불러오기</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={exportImg}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>내보내기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={[styles.button, { marginLeft: 10 }]}
        >
          <Text style={styles.buttonText}>다시 그리기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={save}
          style={[styles.button, { marginLeft: 10 }]}
        >
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    ...Util.getElevation(1),
  },
  buttonText: {
    color: 'black',
  },
});

export default PaintHeader;
