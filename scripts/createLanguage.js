// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const examples = require('../data_test/languages.json');
const url = 'http://127.0.0.1:3001/api/languages';

const createLanguages = async (data) => {
  for (let j = 0; j < 1000; j++) {
    for (let i = 0; i < data.length; i++) {
      await axios
        .post(url, data[i])
        .then((res) => {
          console.log(`Status: ${j} >> ${i} >> ${ res.status}`);
          // console.log('Body: ', res.data);
          sleep(100);
        })
        .catch((err) => {
          console.log('error', i);
        });
    }
  }
  return true;
};

createLanguages(examples);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}