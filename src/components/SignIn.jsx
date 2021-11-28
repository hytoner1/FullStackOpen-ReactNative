import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import * as yup from 'yup';

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
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username required'),
  password: yup
    .string()
    .required('Password required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={{ color: 'white' }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
}

const SignInWrapper = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    console.log(username, ' : ', password);
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    }
    catch (e) {
      console.log('error:', e);
    }
  }

  return (
    <SignInWrapper onSubmit={onSubmit} />
  );
};

export default SignIn;