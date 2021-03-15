const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MQTT = require('./config/data-access');

const mqttOptions = {
  protocol: 'mqtt',
  clientId: 'serverId-rtlt8147900416',
};
const broker = MQTT.connect('mqtt://broker.hivemq.com', mqttOptions);
const {getConfiguration} = require('./config/index');
const routes = require('./routes');

const config = getConfiguration();
const port = process.env.PORT || config.port;

const app = express();

broker.on('connect', () => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/', routes);
  app.use(express.static(path.join(__dirname, '../../build/client')));

  app.listen(port, () => {
    console.log(`Real time location server is running on port ${port}`);
  });
});
