import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import * as yup from 'yup';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
  submitButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 10,
    padding: 5
  }
});

const initialValues = {
  username: "",
  password: "",
  passwordAgain: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username required')
    .max(30, 'Username must be shorter than 30 characters'),
  password: yup
    .string()
    .required('Password required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be less than 50 characters long'),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation required')
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput name='username' placeholder='Username' testID='newUsernameField' />
      <FormikTextInput name='password' placeholder='Password' testID='newPasswordField' />
      <FormikTextInput name='passwordAgain' placeholder='Repeat Password' testID='newPasswordAgainField' />
      <Pressable onPress={onSubmit} style={styles.submitButton} testID='submitButton'>
        <Text style={{ color: 'white' }}>
          Sign Me Up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUpWrapper = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async ({ username, password }) => {
    try {
      const { signUpData } = await signUp({ username, password });
      const { signInData } = await signIn({ username, password });

      history.push('/');
    }
    catch (e) {
      console.log('error:', e);
    }
  };

  return (
    <SignUpWrapper onSubmit={onSubmit} />
  );
};

export default SignUp;