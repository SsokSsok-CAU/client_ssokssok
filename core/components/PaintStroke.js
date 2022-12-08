import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const PaintStroke = ({ onPress, stroke }) => {
  const snap = useSnapshot(state);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: stroke / 1.3,
          backgroundColor: snap.strokeColor,
          height: stroke / 3,
          borderRadius: 10,
          transform: [
            {
              rotateZ: '45deg',
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

export default PaintStroke;
