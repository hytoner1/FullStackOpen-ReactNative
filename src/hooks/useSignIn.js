import { gql, useApolloClient, useMutation } from '@apollo/client';

import useAuthStorage from './useAuthStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    console.log('signing in');
    const ret = await mutate({ variables: { username, password } });
    console.log('ret:', ret);
    if (ret.data && ret.data.authorize) {
      console.log('token:', ret.data.authorize.accessToken);
      await authStorage.setAccessToken(ret.data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return ret;
  }

  return [signIn, result];
};

export default useSignIn;