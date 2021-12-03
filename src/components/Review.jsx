import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

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
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: ""
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repo owner name required'),
  ownerName: yup
    .string()
    .required('Repo name required'),
  rating: yup
    .string()
    .required('Rating required'),
});

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput name='repositoryName' placeholder='Repo Name' testID='nameField' />
      <FormikTextInput name='ownerName' placeholder='Repo Owner Name' testID='ownerField' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' testID='ratingField' />
      <FormikTextInput name='text' placeholder='Review' multiline='true' testID='reviewTextField' />
      <Pressable onPress={onSubmit} style={styles.submitButton} testID='submitButton'>
        <Text style={{ color: 'white' }}>
          Create a Review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewWrapper = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const history = useHistory();
  const [review] = useCreateReview();


  const onSubmit = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const ratingNumber = parseInt(rating);
      const { data } = await review({ repositoryName, ownerName, rating: ratingNumber, text });
      history.push(`/${data?.createReview.repositoryId}`);
    }
    catch (e) {
      console.log('error:', e);
    }
  };

  return (
    <ReviewWrapper onSubmit={onSubmit} />
  );
};

export default Review;