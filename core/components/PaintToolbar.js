import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import utils from '../utils';
import PaintColor from './PaintColor';
import PaintStroke from './PaintStroke';

const PaintToolbar = () => {
  const [showStrokes, setShowStrokes] = useState(false);
  const snap = useSnapshot(state);

  const handleStrokeChange = (stroke) => {
    state.strokeWidth = stroke;
    setShowStrokes(false);
  };
  const colors = ['black', 'red', 'blue', 'green', '#892D32'];
  const strokes = [5, 10, 15, 20, 25, 30, 35, 40, 45];

  return (
    <>
      {showStrokes && (
        <View
          style={[
            styles.toolbar,
            {
              bottom: 50,
              position: 'absolute',
            },
          ]}
        >
          {strokes.map((stroke) => (
            <PaintStroke
              key={stroke}
              stroke={stroke}
              onPress={() => handleStrokeChange(stroke)}
            />
          ))}
        </View>
      )}

      <View
        style={[styles.toolbar, { position: 'relative', marginVertical: 12 }]}
      >
        <View
          style={{
            backgroundColor: '#f7f7f7',
            borderRadius: 5,
          }}
        >
          {showStrokes && (
            <View
              style={{
                width: 30,
                height: 5,
                borderRadius: 100,
                backgroundColor: 'black',
                alignSelf: 'center',
                position: 'absolute',
              }}
            />
          )}

          <PaintStroke
            stroke={snap.strokeWidth}
            onPress={() => setShowStrokes(!showStrokes)}
          />
        </View>

        <View
          style={{
            height: 30,
            borderWidth: 1,
            borderColor: '#f0f0f0',
            marginHorizontal: 10,
          }}
        />

        {colors.map((item) => (
          <PaintColor key={item} color={item} />
        ))}
      </View>
    </>
  );
};

export default PaintToolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...utils.getElevation(5),
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    ...utils.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
