const fs = require('fs');
const path = require('path');

function getConfiguration() {
  let confdata;

  try {
    const filePath =
      process.env.NODE_ENV !== 'production'
        ? path.join(path.resolve(__dirname, '..'), 'config.json')
        : './config.json';

    confdata = JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.error(`Configuration Error: ${error.message}`);
    process.exit(1);
  }

  return confdata;
}

module.exports = {
  getConfiguration,
};
