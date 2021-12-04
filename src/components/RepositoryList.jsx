import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
  const [selectedOrdering, setSelectedOrdering] = useState('latest');


  console.log(showOnlyThisID);
  return (
    <View>
      <ItemSeparator />

      <Picker
        selectedValue={selectedOrdering}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedOrdering(itemValue)
        }>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest" value="highest" />
        <Picker.Item label="Lowest" value="lowest" />
      </Picker>

      <ItemSeparator />

      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;