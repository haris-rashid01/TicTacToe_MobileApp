import { StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react'
import { Text, View } from 'react-native';

type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case 'circle':
      return (
        <View>
          <Text style={styles.circle}>O</Text>
        </View>
      );

    case 'cross':
      return (
        <View>
          <Text style={styles.cross}>X</Text>
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  cross: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4C4C', // Bright Red
    textShadowColor: '#FF4C4C88',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  circle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00FFAB', // Bright Green
    textShadowColor: '#00FFAB88',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  }
});

export default Icons;
