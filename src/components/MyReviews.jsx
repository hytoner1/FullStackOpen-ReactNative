import React from 'react';
import { useQuery } from '@apollo/client';

import { FlatList, View, StyleSheet, Text, Button, Alert, Pressable } from 'react-native';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

import useDeleteReview from '../hooks/useDeleteReview';

import theme from '../theme';
import { useHistory } from 'react-router-native';

export const ItemSeparator = () => <View style={styles.separator} />;

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
  blueButton: {
    textAlign: 'center',
    width: 100,
    backgroundColor: theme.colors.primary,
    marginTop: 5,
    marginRight: 5,
    borderRadius: 10,
    padding: 5
  },
  redButton: {
    textAlign: 'center',
    width: 100,
    backgroundColor: 'red',
    marginTop: 5,
    marginRight: 5,
    borderRadius: 10,
    padding: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  }
});

const MyReviews = () => {
  let history = useHistory();
  const [deleteReview] = useDeleteReview();
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network"
  });

  let reviewsData = [];
  if (data && data.authorizedUser.reviews.edges) {
    reviewsData = data.authorizedUser.reviews.edges;
  }

  const renderItem = ({ item }) => {
    const date = new Date(item.node.createdAt);

    const createTwoButtonAlert = () => {
      Alert.alert(
        "Delete Review",
        "Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => deleteReview(review.node.id) }
        ]
      );
    };

    return (
      <View style={styles.flexContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.ratingText}>
            {item.node.rating}
          </Text>

          <View style={styles.contentContainer}>
            <Text style={{ fontWeight: theme.fontWeights.bold }}>
              {`${item.node.repository.ownerName} / ${item.node.repository.name}`}
            </Text>
            <Text style={{ color: '#333333', marginBottom: 10 }}>
              {`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`}
            </Text>
            <Text style={{ flexGrow: 1, paddingRight: 100 }}>
              {item.node.text}
            </Text>
          </View>
        </View>

        <View style={{
          width: 200, margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Pressable style={styles.blueButton}
            onPress={() => history.push(`/${item.node.repository.id}`)}
          >
            <Text style={styles.buttonText}>
              View Repository
            </Text>
          </Pressable>

          <Pressable style={styles.redButton}
            onPress={createTwoButtonAlert}
          >
            <Text style={styles.buttonText} >
              Delete Comment
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reviewsData}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.node.id}
    />
  );
};

export default MyReviews;