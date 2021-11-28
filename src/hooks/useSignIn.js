import { gql, useMutation } from '@apollo/client';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const ret = await mutate({ variables: { username, password } });
    return ret;
  }

  return [signIn, result];
};

export default useSignIn;