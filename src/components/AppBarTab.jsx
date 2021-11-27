import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from 'react-router-native';

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

const AppBarTab = ({ linkTo, text }) => {
  return (
    <Link to={linkTo}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;