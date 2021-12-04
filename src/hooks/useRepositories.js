import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrdering) => {
  let sortVariables = {};
  if (selectedOrdering && (selectedOrdering === 'ASC' || selectedOrdering === 'DESC')) {
    sortVariables = { orderDirection: selectedOrdering, orderBy: 'RATING_AVERAGE' };
  }

  const { loading, data } = useQuery(GET_REPOSITORIES, {
    variables: { ...sortVariables },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : undefined,
    loading
  };
};

export default useRepositories;