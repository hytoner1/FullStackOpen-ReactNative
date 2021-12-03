import { useApolloClient, useMutation } from '@apollo/client';

import useAuthStorage from './useAuthStorage';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const ret = await mutate({ variables: { username, password } });
    if (ret.data && ret.data.authorize) {
      await authStorage.setAccessToken(ret.data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return ret;
  };

  return [signIn, result];
};

export default useSignIn;