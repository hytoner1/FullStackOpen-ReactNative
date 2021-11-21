import React from 'react';

import { Text, View } from 'react-native';

const RepositoryItem = ({item}) => {
  return (
    <View>
      <Text>Full Name: {item.id}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Stars: {item.stargazerCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
}

export default RepositoryItem;