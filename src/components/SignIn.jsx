import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import { Redirect } from 'react-router-native';

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
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const onSubmit = ({ username, password }) => {
    console.log(username, ' : ', password);
  }

  return (
    <SignInWrapper onSubmit={onSubmit} />
  );
};

export default SignIn;