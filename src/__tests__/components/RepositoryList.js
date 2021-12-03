import React, { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      //debug();

      expect(getAllByTestId('repositoryName')).toHaveLength(2);

      expect(getAllByTestId('repositoryName')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('repositoryName')[1]).toHaveTextContent('async-library/react-async');

      expect(getAllByTestId('repositoryDescription')[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(getAllByTestId('repositoryDescription')[1]).toHaveTextContent('Flexible promise-based React data loader');

      expect(getAllByTestId('repositoryLanguage')[0]).toHaveTextContent('TypeScript');
      expect(getAllByTestId('repositoryLanguage')[1]).toHaveTextContent('JavaScript');

      expect(getAllByTestId('starsCount')[0]).toHaveTextContent('21.9k');
      expect(getAllByTestId('starsCount')[1]).toHaveTextContent('1.8k');

      expect(getAllByTestId('forksCount')[0]).toHaveTextContent('1.6k');
      expect(getAllByTestId('forksCount')[1]).toHaveTextContent('69');

      expect(getAllByTestId('reviewsCount')[0]).toHaveTextContent('3');
      expect(getAllByTestId('reviewsCount')[1]).toHaveTextContent('3');

      expect(getAllByTestId('rating')[0]).toHaveTextContent('88');
      expect(getAllByTestId('rating')[1]).toHaveTextContent('72');
    });
  });
});