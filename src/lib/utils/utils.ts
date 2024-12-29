import { Provider } from '../../constants/types/types';
import {
  validateToken,
  type jwtValidationResponse,
} from '@kinde/jwt-validator';

export const capitalizeFirstLetter = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1);
};

// Takes a string in the YYYY-MM-DD format and returns a string in the DD FullMonth YYYY format
export const DBDateStringToYearMonthDay = (
  date: string | null | Date | undefined,
): string => {
  if (!date) return '';
  let dateObj = new Date(date);
  return dateObj.toUTCString().split(' ').slice(1, 4).join(' ');
};

// Takes a string in the YYYY-MM-DD format and returns a string of MM-DD-YYYY
export const dbDateStringToMonthDayYearString = (date: string): string => {
  const inputFormat = date.split('-');
  if (inputFormat.length !== 3) return '';
  return `${inputFormat[1]}/${inputFormat[2]}/${inputFormat[0]}`;
};

export const existingFullPhoneNumberFormat = (value: string): string =>
  value?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

export const formatDateObjToNADateString = (date: Date): string => {
  if (!date) return '';
  return `${date.toUTCString().split(' ').slice(1, 4).join(' ')}`;
};

export const formatPhoneNumber = (
  value: string | undefined,
): string | undefined => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, ''); // Remove all non-digit characters
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const formatTableHeaderNames = (headers: string[]): string[] => {
  // date_referral_received => Date Referral Received
  return headers.map((word: string) => {
    if (word.includes('_')) {
      const separatedWords = word.split('_');
      const firstLetterCapitalized = separatedWords.map(
        w => w[0].toUpperCase() + w.slice(1),
      );
      return firstLetterCapitalized.join(' ');
    } else {
      return word[0].toUpperCase() + word.slice(1);
    }
  });
};
export const formatStringToDateString = (date: string): string => {
  return new Date(date).toDateString();
};
// NA = North America -- can be used for epoch to date string conversion
export const fromISOStringToNADateString = (date: string | number): string => {
  const dateObj = new Date(Number(date));
  return `${dateObj.getMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getFullYear()}`;
};

export const fromDateTimeStringToNALocaleString = (
  date: string | number,
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const handleAssertDataValidationError = (error: Error) => {
  // throw new Error to capture more accurate error message
  // @ts-ignore
  const { key, value } = error;
  throw new Error(`Improper input "${value}" on the "${key}" field`);
};

export const numberWithCommas = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// form validation function
export const required = (value: string) => (value ? undefined : 'Required');

export const separateOphOptomProviders = (
  providers: Provider[],
): { optometristProviders: Provider[]; surgeonProviders: Provider[] } => {
  const optometristProviders: Provider[] = [];
  const surgeonProviders: Provider[] = [];
  providers.forEach(provider => {
    if (provider.type === 'optometrist') {
      optometristProviders.push(provider);
    } else {
      surgeonProviders.push(provider);
    }
  });

  return { optometristProviders, surgeonProviders };
};

export const undoPhoneNumberFormat = (
  value: string | undefined,
): string | undefined => value?.replace(/[\s()-]/g, '');

export const valueGetterFormatDbDate = (date: number): Date => {
  const dateObj = new Date(date);
  const slashFormatDate = `${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getFullYear()}`;
  return new Date(slashFormatDate);
};

// export const validateJwtToken = async (token: string): Promise<boolean> => {
//   // Verify and decode the JWT
//   if (!token) return false;

//   const validationResult: jwtValidationResponse = await validateToken({
//     token,
//     domain: process.env.KINDE_ISSUER_URL,
//   });

//   return validationResult.valid;
// };

export const validateJwtToken = async (token: string): Promise<boolean> => {
  if (!token) {
    console.error('JWT validation failed: No token provided');
    return false;
  }

  try {
    console.log('Validating token with domain:', process.env.KINDE_ISSUER_URL);
    const validationResult: jwtValidationResponse = await validateToken({
      token,
      domain: process.env.KINDE_ISSUER_URL,
    });

    console.log('Token validation result:', validationResult);
    return validationResult?.valid || false;
  } catch (error) {
    console.error('JWT validation error:', error);
    return false;
  }
};