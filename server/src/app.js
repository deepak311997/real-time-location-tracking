const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MQTT = require('./config/data-access');

const mqttOptions = {
  clientId: 'serverId-rtlt8147900416',
  reconnectPeriod: 5000,
};
const brokerEndpoint = process.env.NODE_ENV !== 'production' ? 'mqtt://broker.hivemq.com' : 'mqtts://broker.hivemq.com';
const broker = MQTT.connect(brokerEndpoint, mqttOptions);
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
