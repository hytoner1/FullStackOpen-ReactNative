import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    // ...
  },
  scrollBar: {
    flexDirection: 'row',
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollBar} >
        <AppBarTab linkTo='/' text='Repositories' />
        <AppBarTab linkTo='/sign-in' text='Sign In' />
      </ScrollView>
    </View>
  );
};

export default AppBar;