import crypto from 'crypto';
const salt = `D3jsElectionJs@0PKTGraphQL477P[]|><VZA2*^`;
const interations = 10000;
const keylen = 256;
const digest = 'sha512';

export const hashPassword = (text: string): string => {
  return crypto
    .pbkdf2Sync(text, salt, interations, keylen, digest)
    .toString('base64');
};

export const verifyHash = (hash: string, password: string): boolean => {
  return hashPassword(password) === hash;
};
