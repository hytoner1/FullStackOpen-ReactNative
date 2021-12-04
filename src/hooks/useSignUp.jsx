import { useMutation } from '@apollo/client';


import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const ret = await mutate({ variables: { username, password } });
    if (ret.data && ret.data.authorize) {
      await authStorage.setAccessToken(ret.data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return ret;
  };

  return [signUp, result];
};

export default useSignUp;