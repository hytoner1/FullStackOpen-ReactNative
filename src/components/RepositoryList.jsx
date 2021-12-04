import React, { useState } from 'react';
import {
  FlatList, View,
  StyleSheet, Pressable,
  SafeAreaView, TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <SafeAreaView>
        <ItemSeparator />
        <TextInput style={{
          margin: 5, padding: 5,
        }}
          placeholder='Search'
          onChangeText={(text) => props.setSearchKeyword(text)}
        />

        <ItemSeparator />

        <Picker style={{
          margin: 5, padding: 5,
          borderStyle: 'solid', borderWidth: 10,
          borderColor: styles.separator.backgroundColor
        }}
          onValueChange={(itemValue, itemIndex) => {
            props.setSelectedOrdering(itemValue);
          }}>
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Highest" value="DESC" />
          <Picker.Item label="Lowest" value="ASC" />
        </Picker>
        <ItemSeparator />
      </SafeAreaView>
    );
  };

  render() {
    const onEndReach = this.props.onEndReach;
    const repositories = this.props.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];


    return (
      <View style={{ flex: 1 }}>
      <FlatList
          data={repositoryNodes}
          style={{ flex: 1, flexDirection: 'row' }}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={1}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debounceSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories(selectedOrdering, debounceSearchKeyword);

  const onEndReach = () => {
    console.log('end');
    fetchMore();
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSearchKeyword={setSearchKeyword}
      setSelectedOrdering={setSelectedOrdering}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;