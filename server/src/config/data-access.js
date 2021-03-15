const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.MQTTBroker = null;
  }

  connect(host, options = {}) {
    this.MQTTBroker = mqtt.connect(host, options);

    this.MQTTBroker.on('connect', () => {
      console.log(`MQTT connected to "rtlt/location" using ${host}`);
    });

    this.MQTTBroker.on('error', (err) => {
      console.log(err);
      this.MQTTBroker.end();
    });

    this.MQTTBroker.on('error', (err) => {
      console.log("Can't connect", err);
      this.MQTTBroker.end();
    });

    this.MQTTBroker.on('close', () => {
      console.log(`MQTT broker disconnected`);
    });

    return this.MQTTBroker;
  }

  sendMessage(message) {
    this.mqttClient.publish('rtlt/location', message);
  }
}

const MQTT = new MqttHandler();

module.exports = MQTT;
