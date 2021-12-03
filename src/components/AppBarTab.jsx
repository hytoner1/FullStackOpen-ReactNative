import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ onClick, text }) => {
  return (
    <Pressable onPress={onClick} style={({ pressed }) => {
      backgroundColor: pressed
        ? 'rgb(210, 230, 255)'
        : 'white';
    }}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;