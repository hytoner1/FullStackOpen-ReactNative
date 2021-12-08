import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router-native';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const { error, data } = useQuery(GET_AUTHORIZED_USER);
  if (error) {
    console.log('error:', error);
  }

  const authorizedUser = data ? data.authorizedUser : null;

  const onClick_repositories = () => {
    history.push('/');
  };

  const onClick_review = () => {
    history.push('/review');
  };

  const onClick_myReviews = () => {
    history.push('/my-reviews');
  };

  const onClick_signIn = () => {
    history.push('/sign-in');
  };

  const onClick_signUp = () => {
    history.push('/sign-up');
  };

  const onClick_signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollBar} >
        <AppBarTab onClick={onClick_repositories} text='Repositories' />
        {authorizedUser && (<AppBarTab onClick={onClick_review} text='Create a Review' />)}
        {authorizedUser && (<AppBarTab onClick={onClick_myReviews} text='My Reviews' />)}
        {!authorizedUser && (<AppBarTab onClick={onClick_signIn} text='Sign In' />)}
        {!authorizedUser && (<AppBarTab onClick={onClick_signUp} text='Sign Up' />)}
        {authorizedUser && (<AppBarTab onClick={onClick_signOut} text='Sign Out' />)}
      </ScrollView>
    </View>
  );
};

export default AppBar;