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

export const RepositoryListContainer = ({ repositories, PickerHeader }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return <RepositoryItem item={item} />;
  };

  return <FlatList
    ListHeaderComponent={PickerHeader}
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />;
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState('latest');
  const { repositories } = useRepositories(selectedOrdering);

  const PickerHeader = () => (
    <Picker style={{
      margin: 5, padding: 5,
      borderStyle: 'solid', borderWidth: 10, borderColor: styles.separator.backgroundColor
    }}
      selectedValue={selectedOrdering}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedOrdering(itemValue);

      }}>
      <Picker.Item label="Latest" value="latest" />
      <Picker.Item label="Highest" value="DESC" />
      <Picker.Item label="Lowest" value="ASC" />
    </Picker>
  );

  return (
    <View>
      <RepositoryListContainer repositories={repositories} PickerHeader={PickerHeader}/>
    </View>
  );
};

export default RepositoryList;