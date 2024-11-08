import { define } from 'superstruct';
import isEmail from 'is-email';

const idRegex = /[0-9a-z]{24,26}/;
const addressRegex = /^\d+[A-Za-z0-9\s.,'#-]+$/;
const cityRegex = /^[A-Za-z\s.,'-]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/;
const email = () => define('email', value => isEmail(String(value)));
const emailOrEmpty = () =>
  define('email', value => {
    return value === '' || isEmail(String(value)); // Allow empty string or a valid email
  });
const nameRegex = /^[A-Za-z\s.',-]+$/;
const phoneNumberRegex = /^\d{10}$/;
const stateRegex = /^[A-Z]{2}$/;
const zipCodeRegex = /^\d{5}$/;
const typeRegex = /^(optometry|ophthalmology|optometrist|ophthalmologist)$/;

export {
  addressRegex,
  cityRegex,
  dateRegex,
  dateTimeRegex,
  email,
  emailOrEmpty,
  idRegex,
  nameRegex,
  phoneNumberRegex,
  stateRegex,
  zipCodeRegex,
  typeRegex,
};
