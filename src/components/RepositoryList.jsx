import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return <RepositoryItem item={item} />;
  };

  return <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />;
};

const RepositoryList = ({ showOnlyThisID }) => {
  const { repositories } = useRepositories();

  console.log(showOnlyThisID);
  return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;