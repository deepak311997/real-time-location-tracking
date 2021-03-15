const fs = require('fs');
const path = require('path');
const MQTT = require('../config/data-access');

const startPublishing = async (req, res) => {
  try {
    const geoJson = JSON.parse(
      fs.readFileSync(
        path.join(
          process.env.NODE_ENV !== 'production'
            ? path.resolve(__dirname, '..')
            : path.resolve('./server/'),
          'geoJson.json'
        )
      )
    );

    for (let idx = 0, len = geoJson.features.length; idx < len; idx++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      MQTT.MQTTBroker.publish('rtlt/location', JSON.stringify(geoJson.features[idx]));
    }
    res.status(200).send({message: 'Publishing started successfully !!', status: 200});
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong ! Please contact the adminstrator',
      error,
    });
  }
};

module.exports = {
  startPublishing,
};
