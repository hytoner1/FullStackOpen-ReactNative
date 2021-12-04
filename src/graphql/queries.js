import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int)
  {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first)
    {
      edges{
        node{
          id,
          fullName,
          name,
          ownerName,
          description,
          language,
          ratingAverage,
          stargazersCount,
          forksCount,
          ownerAvatarUrl,
          reviewCount
        },
        cursor
      }
      pageInfo {
        endCursor,
        startCursor,
        hasNextPage
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id,
      username,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            repository {
              name,
              ownerName,
              id,
            }
          }
          cursor
        }
        pageInfo {
          endCursor,
          startCursor,
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id,
      fullName,
      description,
      language,
      ratingAverage,
      stargazersCount,
      forksCount,
      ownerAvatarUrl,
      reviewCount,
      url,
      reviews {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            }
          }
        }
      }
    }
  }
`;