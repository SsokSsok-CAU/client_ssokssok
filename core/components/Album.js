import React from 'react';
import Picture from './Picture';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';

function Album(props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.album}
    >
      {props.pics.length === 0
        ? null
        : props.pics.map((pic, index) => (
            <Picture
              navigation={props.navigation}
              key={index}
              style={styles.pics}
              uri={pic}
            />
          ))}
      <Picture navigation={props.navigation} style={styles.pics} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  album: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pics: {
    alignItems: 'flex-start',
  },
});

export default Album;
