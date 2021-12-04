import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String)
  {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword)
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
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id,
      username
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