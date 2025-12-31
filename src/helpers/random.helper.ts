import cryptoRandomString from 'crypto-random-string';

export const generateRandomNumber = (prefix: string = 'SP') => {
  const randomString = cryptoRandomString({ length: 9, type: 'numeric' });
  const randomNumber = `${prefix}${randomString}`;
  return randomNumber;
};
