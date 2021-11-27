import React from 'react';

import { Text, StyleSheet, View } from 'react-native';
import { Route, NativeRouter, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <AppBar />
        <Switch>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Route path='/sign-in'>
            <SignIn />
          </Route>
          <Redirect to='/' />
        </Switch>
      </NativeRouter>
    </View>
  );
};

export default Main;