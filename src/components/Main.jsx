import React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  Route, NativeRouter,
  Switch, Redirect, useParams
} from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const SingleRepo = () => {
    let { id } = useParams();
    console.log('repo ID:', id);

    const { repository } = useRepository(id);

    if (!repository) {
      return null;
    }

    return <RepositoryItem item={repository} />
  };

  return (
    <View style={styles.container}>
      <NativeRouter>
        <AppBar />
        <Switch>
          <Route path='/sign-in'>
            <SignIn />
          </Route>
          <Route path='/:id'>
            <SingleRepo />
          </Route>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Redirect to='/' />
        </Switch>
      </NativeRouter>
    </View>
  );
};

export default Main;