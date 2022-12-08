import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { state } from '../store';
import Util from '../utils';
import * as FileSystem from 'expo-file-system';

async function ensureDirExists() {
  const dir = FileSystem.documentDirectory + 'myDirectory/';
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    console.log("directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  } else {
    console.log('directory alreay exists');
  }
}

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

  const save = () => {
    const image = canvasRef.current?.toSvg(500, 500);
    if (image) {
      console.log('SVG', image);
      const fileUri = FileSystem.documentDirectory + 'myDirectory/myFile';
      ensureDirExists()
        .then(() =>
          FileSystem.writeAsStringAsync(fileUri, image)
            .then((contents) => {
              console.log('write Success');
              console.log(contents);
            })
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));
    }
  };

  const undo = () => {
    canvasRef.current?.undo();
  };

  const redo = () => {
    canvasRef.current?.redo();
  };

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
          style={styles.button}
        >
          <Text style={styles.buttonText}>앞으로가기</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>다시시작하기</Text>
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
