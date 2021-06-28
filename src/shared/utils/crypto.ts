import crypto from 'crypto';
const salt = `1234567890!@#$%^&*(){}|:"<>?ABCDEFGHIJKLmnopqrstuvxyz`;
const interations = 10000;
const keylen = 256;
const digest = 'sha512';

export const hashPassword = (text: string): string => {
  return crypto
    .pbkdf2Sync(text, salt, interations, keylen, digest)
    .toString('base64');
};

export const verifyHash = (hash: string, password: string): boolean => {
  const hashPass = hashPassword(password);
  return hashPass === hash;
};
