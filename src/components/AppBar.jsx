import React from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router-native';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

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
  const history = useHistory();

  const { error, data } = useQuery(GET_AUTHORIZED_USER);
  if (error) {
    console.log('error:', error);
  }

  const authorizedUser = data ? data.authorizedUser : null;

  const onClick_repositories = () => {
    history.push('/');
  };

  const onClick_signIn = () => {
    history.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollBar} >
        <AppBarTab onClick={onClick_repositories} text='Repositories' />
        {!authorizedUser && (<AppBarTab onClick={onClick_signIn} text='Sign In' />)}
        {authorizedUser && (<AppBarTab linkTo='/sign-in' text='Sign Out' />)}
      </ScrollView>
    </View>
  );
};

export default AppBar;