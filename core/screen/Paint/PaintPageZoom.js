import ImageZoom from 'react-native-image-pan-zoom';
import * as React from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
  Dimensions,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// for android
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { useSnapshot } from 'valtio';
import { state } from '../../store';
import PaintToolbar from './../../components/PaintToolbar';
import PaintHeader from './../../components/PaintHeader';
import { useState } from 'react';

function PaintPageZoom() {
  const { width, height } = useWindowDimensions();
  const [panToMove, setPanToMove] = useState(false);
  const [isDrawing, setIsDrawing] = useState(true);
  const [preStrokeWidth, setPreStrokeWidth] = useState(8);
  const snap = useSnapshot(state);
  const canvasRef = useRef(null);
  const dummyImg = require('../../assets/sample/png1.png');

  const handleZoom = () => {
    setPanToMove(true);
    setPreStrokeWidth(state.strokeWidth);
    setIsDrawing(false);
    state.strokeWidth = 0;
  };

  const handleDraw = () => {
    setPanToMove(false);
    setIsDrawing(true);
    state.strokeWidth = preStrokeWidth;
    if (preStrokeWidth == 0) {
      state.strokeWidth = 8;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.zoomContainer}>
        <PaintHeader
          canvasRef={canvasRef}
          isDrawing={isDrawing}
          handleFunction={{ handleDraw, handleZoom }}
        />
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height / 1.2}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width}
          panToMove={panToMove}
          enableDoubleClickZoom={false}
          enableSwipeDown={false}
          enableCenterFocus={true}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              width: width - 24,
              marginLeft: 12,
              position: 'relative',
            }}
          >
            <View style={styles.backgroundContainer}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={dummyImg}
                resizeMode="center"
              />
            </View>
            <View style={styles.overlay}>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width,
                  backgroundColor: 'transparent',
                  borderRadius: 10,
                }}
              >
                <SketchCanvas
                  strokeColor={snap.strokeColor}
                  strokeWidth={snap.strokeWidth}
                  ref={canvasRef}
                  containerStyle={styles.container}
                />
              </View>
            </View>
          </View>
        </ImageZoom>
        <PaintToolbar />
      </View>
      {isDrawing ? (
        <Pressable style={styles.button} onPress={handleZoom}>
          <Text style={styles.buttonText}>그리기</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={handleDraw}>
          <Text style={styles.buttonText}>확대</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  zoomContainer: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
  },
  image: {},
  imageContainer: {},
  backgroundContainer: {
    zIndex: -100,
    top: 'auto',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
    position: 'relative',
  },
  overlay: {
    zIndex: 100,
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0062D4',
    position: 'absolute',
    bottom: 25,
    right: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
});

export default PaintPageZoom;
