import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;