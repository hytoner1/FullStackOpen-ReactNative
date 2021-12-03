import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  flexContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  ratingText: {
    textAlign: 'center',
    width: 100,
    height: 50,
    padding: 5,
    margin: 5,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 50
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ reviews }) => {
  console.log(reviews);
  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    const date = new Date(item.createdAt);

    return (
      <View style={styles.flexContainer}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.ratingText}>
            {item.rating}
          </Text>

          <View style={styles.contentContainer}>
            <Text style={{ fontWeight: theme.fontWeights.bold }}>
              {item.user.username}
            </Text>
            <Text style={{ color: '#333333', marginBottom: 10 }}>
              {`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`}
            </Text>
            <Text style={{ flexGrow: 1, paddingRight: 100 }}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return <FlatList
    data={reviewNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />;
};

export default ReviewList;