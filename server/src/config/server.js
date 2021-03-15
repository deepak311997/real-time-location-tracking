const fs = require('fs');
const path = require('path');

function getConfiguration() {
  let confdata;

  try {
    const filePath = path.join(process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, '..')
    : path.resolve('./build/server/'), 'config.json');

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
