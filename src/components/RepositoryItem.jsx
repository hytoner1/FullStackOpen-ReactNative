import React from 'react';
import { useHistory, useParams } from 'react-router-native';

import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  flexContainer: {
    display: 'flex',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  statsTextValue: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    fontWeight: theme.fontWeights.bold,
  },
  statsTextDescription: {
    marginLeft: 10,
  },
  titleText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginTop: 10,
    marginBottom: 5,
  },
  languageText: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    marginTop: 5,
    borderRadius: 10,
    padding: 5
  }
});

const StatsEntry = ({ itemText, itemValue, testID }) => {
  return (
    <View style={styles.flexContainer, { flexDirection: 'column' }}>
      <Text style={styles.statsTextValue} testID={testID}>
        {itemValue < 1000 ? (itemValue) : (Math.round(itemValue / 100) / 10 + 'k')}
      </Text>
      <Text style={styles.statsTextDescription}>{itemText}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const history = useHistory();
  let { id } = useParams();


  const RepositoryItemContent = ({ withLink }) => (
    <View style={styles.flexContainer, { flexDirection: 'column' }}>
      <View style={styles.flexContainer, { flexDirection: 'row' }}>
        <View>
          <Image
            style={styles.logo}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text style={styles.titleText} testID="repositoryName"> {item.fullName}</Text>
          <Text testID="repositoryDescription">Description: {item.description}</Text>
          <Text style={styles.languageText} testID="repositoryLanguage">{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexContainer, { flexDirection: 'row', marginBottom: 10 }}>
        <StatsEntry itemText='Stars' itemValue={item.stargazersCount} testID="starsCount" />
        <StatsEntry itemText='Forks' itemValue={item.forksCount} testID="forksCount" />
        <StatsEntry itemText='Reviews' itemValue={item.reviewCount} testID="reviewsCount" />
        <StatsEntry itemText='Rating' itemValue={item.ratingAverage} testID="rating" />
      </View>
      {withLink === true && (
        <View style={styles.flexContainer, { flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
          <Pressable onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.languageText}>{item.url}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  if (!id) {
    const handlePress = () => {
      console.log('id:', item.id);
      history.push(`/${item.id}`);
    }

    return (
      <Pressable onPress={handlePress}>
        <RepositoryItemContent />
      </Pressable>
    );
  }

  return (
    <RepositoryItemContent withLink={true} />
  );
};

export default RepositoryItem;