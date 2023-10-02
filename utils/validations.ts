import * as yup from 'yup';
import { EnumCargoType } from '@/types';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const name: yup.StringSchema = yup.string()
  .max(100, 'Cannot be more than 100 characters.')
  .required('This field is required');

const firstName: yup.StringSchema = yup.string()
  .max(70, 'Cannot be more than 70 characters.')
  .required('This field is required')
  .matches(
    /^(?!^\s+$)(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s.,?!-/]+$/u,
    'This field cannot contain only whitespaces or special characters',
  );

const lastName: yup.StringSchema = yup.string()
  .max(70, 'Cannot be more than 70 characters.')
  .required('This field is required')
  .matches(
    /^(?!^\s+$)(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s.,?!-/]+$/u,
    'This field cannot contain only whitespaces or special characters',
  );

export const username: yup.StringSchema = yup.string()
  .min(4, 'Cannot be less than 4 characters.')
  .max(20, 'Cannot be more than 20 characters.')
  .matches(/^\S*$/, 'Spaces are not allowed')
  .required('This field is required');

export const password: yup.StringSchema = yup.string()
  .min(8, 'The password doesn\'t meet minimum security requirements: 8+ characters including letters, numbers')
  .max(100, 'Maximum 100 characters')
  .matches(/^(?=.*[0-9])(?=.*[\D])([\D0-9]+)$/, 'Must contain numbers and letters')
  .matches(/[^A-Za-z0-9]|[A-Z]/, 'Must contain one uppercase letter or special symbol')
  .matches(/[a-z]/, 'Must contain one lowercase letter')
  .matches(/^\S*$/, 'Spaces are not allowed')
  .required('This field is required');

export const confirmPassword: yup.StringSchema = yup.string()
  .oneOf([yup.ref('password'), ''], 'Passwords must match')
  .required('This field is required');

export const phone: yup.StringSchema = yup.string()
  .max(15, 'Please enter a valid phone number.')
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('This field is required');

const emailValidationMessage = 'Please enter your email address in format: username@example.com';

export const email: yup.StringSchema = yup.string()
  .email(emailValidationMessage)
  .test('starts-with-number', emailValidationMessage, (value) => {
    const regex = /^[0-9]/;

    return !regex.test(value || '');
  })
  .test('no-consecutive-dots', emailValidationMessage, (value) => !/\.\.+/g.test(value || ''))
  .matches(/^[^.].*[^.]@[a-z0-9.-]+\.[a-z]{2,}$/, emailValidationMessage)
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, emailValidationMessage)
  .required('This field is required');

export const confirmEmail: yup.StringSchema = yup.string()
  .oneOf([yup.ref('email')], 'Email must match')
  .required('This field is required');

export const zipCode: yup.StringSchema = yup.string()
  .min(5, 'Please enter a valid Zip Code.')
  .max(10, 'Zip code should be in format "12345" or "12345-1234".')
  .matches(/^\d{5}$|^\d{5}-\d{4}$/, 'Zip code should be in format "12345" or "12345-1234".');

export const limitSymbols200: yup.StringSchema = yup.string()
  .max(200, 'Cannot be more than 200 characters.');

export const percentage: yup.NumberSchema = yup.number()
  .required('This field is required')
  .min(0, 'Number must be greater than or equal to 0')
  .max(100, 'Number must be less than or equal to 100');

export const validationSignUpEmailOnly = yup.object().shape({
  email,
});

export const validationSignUpEmailAndPassword = yup.object().shape({
  password,
  email,
});

export const validationSignUpPhoneOnly = yup.object().shape({
  phone,
});

export const validationSignUp = yup.object().shape({
  password,
  email,
});

export const validationCargo = yup.object().shape({
  title: yup.string()
    .required('This field is required')
    .max(100, 'Cannot be more than 100 characters.'),
  startDate: yup.date().required('This field is required'),
  averageSpeed: yup.number()
    .default(77)
    .required('This field is required')
    .max(100, 'Max average speed is 100 km'),
  startTime: yup.string().required('This field is required'),
  totalDistance: yup.number().required('This field is required'),
  type: yup.string().required(),
  remainingWorkHours: yup.string().test(
    'is-before-max',
    'Maximum is 8 hours',
    (value) => new Date(`1970-01-01T${value}`) <= new Date('1970-01-01T08:00'),
  ).required('This field is required'),
  unloadDate: yup.string().when('type', ([type], schema) => {
    if (type === EnumCargoType.single) return yup.string().required('This field is required');

    return schema;
  }),
  unloadTime: yup.string().when('type', ([type], schema) => {
    if (type === EnumCargoType.single) return yup.string().required('This field is required');

    return schema;
  }),
  multipleUnload: yup.array().when('type', ([type], schema) => {
    if (type === EnumCargoType.multiple) {
      return yup.array().of(
        yup.object().shape({
          date: yup.string().required('This field is required'),
          time: yup.string().required('This field is required'),
          distance: yup.number().required('This field is required'),
          breakTime: yup.string(),
        }),
      );
    }

    return schema;
  }),
});

export const validationProfile = yup.object().shape({
  averageSpeed: yup.number()
    .required('This field is required')
    .min(1, 'Min average speed is 1 km')
    .max(100, 'Max average speed is 100 km'),
  restTime: yup.number()
    .required('This field is required')
    .min(1, 'Min rest time is 1 hour')
    .max(48, 'Max rest time is 48 hours'),
});

export const validationChangePassword = yup.object().shape({
  currentPassword: password,
  password,
  confirmPassword,
});

export const validationNewPassword = yup.object().shape({
  password,
  confirmPassword,
});

export const validationChangeEmail = yup.object().shape({
  email,
  confirmEmail,
});

export const validationSignInEmailAndPassword = yup.object().shape({
  email,
  password,
});

export const validationSignInUsernameAndPassword = yup.object().shape({
  username,
  password,
});

export const validationSignInPhoneAndPassword = yup.object().shape({
  phone,
  password,
});

export const validationForgotPassword = yup.object().shape({
  email,
});

export default {
  validationSignUp,
  validationChangePassword,
  validationNewPassword,
  validationChangeEmail,
  validationSignIn: validationSignInEmailAndPassword,
  validationForgotPassword,
  password,
  confirmPassword,
  email,
  confirmEmail,
};
