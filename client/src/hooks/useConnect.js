import React, {useState, useEffect, useCallback} from 'react';
import MQTT from 'mqtt';

export default function useConnect() {
  const [client, setClient] = useState(null);
  const [isSubscribed, setSubscription] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('Connect');

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectionStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectionStatus('Reconnecting');
      });
      client.on('close', () => {
        console.log('Disconnected');
      });
      client.on('message', (topic, message) => {
        setPayload(JSON.parse(message.toString()));
      });
    }
  }, [client]);

  const mqttConnect = useCallback(() => {
    const brokerEndpoint = process.env.NODE_ENV !== 'production' ? 'mqtt://broker.hivemq.com:8000/mqtt' : 'mqtts://broker.hivemq.com:8000/mqtts';
    
    setConnectionStatus('Connecting');
    setClient(
      MQTT.connect(brokerEndpoint, {
        clientId: 'clientId-rtlt8147900416',
        reconnectPeriod: 5000,
      })
    );
  }, []);

  const mqttDisconnect = useCallback(() => {
    if (client) {
      mqttUnsubscribe();
      client.end(() => {
        setConnectionStatus('Connect');
      });
    }
  }, [client]);

  const mqttSubscribe = useCallback(() => {
    if (client) {
      client.subscribe('rtlt/location', {qos: 2}, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        setSubscription(true);
      });
    }
  }, [client]);

  const mqttUnsubscribe = useCallback(() => {
    if (client) {
      client.unsubscribe('rtlt/location', (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        setSubscription(false);
      });
    }
  }, [client]);

  return {
    isSubscribed,
    payload,
    connectionStatus,
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnsubscribe,
  };
}
