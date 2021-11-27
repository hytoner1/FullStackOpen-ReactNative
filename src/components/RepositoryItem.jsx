import React from 'react';

import { View, StyleSheet, Image } from 'react-native';

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

const StatsEntry = ({ itemText, itemValue }) => {
  return (
    <View style={styles.flexContainer, { flexDirection: 'column' }}>
      <Text style={styles.statsTextValue}>
        {itemValue < 1000 ? (itemValue) : (Math.round(itemValue / 100) / 10 + 'k')}
      </Text>
      <Text style={styles.statsTextDescription}>{itemText}</Text>
    </View>
  );
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer, { flexDirection: 'column' }}>
      <View style={styles.flexContainer, { flexDirection: 'row' }}>
        <View>
          <Image
            style={styles.logo}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text style={styles.titleText}> { item.fullName }</Text>
          <Text>Description: {item.description}</Text>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexContainer, { flexDirection: 'row', marginBottom: 10 }}>
        <StatsEntry itemText='Stars' itemValue={item.stargazersCount} />
        <StatsEntry itemText='Forks' itemValue={item.forksCount} />
        <StatsEntry itemText='Reviews' itemValue={item.reviewCount} />
        <StatsEntry itemText='Rating' itemValue={item.ratingAverage} />
      </View>
    </View>
  );
}

export default RepositoryItem;