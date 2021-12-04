import { DELETE_REVIEW } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (id) => {
    const myResult = await mutate({ variables: { id } });
    apolloClient.resetStore();
    return myResult;
  };

  return [deleteReview, result];
};

export default useDeleteReview;