import React, {Fragment, useState} from 'react';
import axios from 'axios';

import MapComponent from './map-component';
import useConnect from '../hooks/useConnect';

export default function AppComponent() {
  const [isPublishing, setPublishState] = useState(false);
  const {
    isSubscribed,
    payload,
    connectionStatus,
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnsubscribe,
  } = useConnect();

  const isConnected = connectionStatus === 'Connected';

  const onPublish = () => {
    axios.post('/api/start').then(() => console.log('Publishing'));
  };

  return (
    <Fragment>
      <div className="app-container">
        <div className="app-status">
          <span className="app-status--title">Connection Status:</span>
          <span>{` ${connectionStatus}`}</span>
        </div>
        <div className="app-status">
          <span className="app-status--title">Subscription Status:</span>
          <span>{` ${isSubscribed}`}</span>
        </div>
        <div>
          <button
            disabled={isPublishing || connectionStatus === 'Connected'}
            onClick={mqttConnect}
          >
            Connect
          </button>
          <button
            disabled={isPublishing || isSubscribed || !isConnected}
            onClick={mqttSubscribe}
          >
            Subscribe
          </button>
          <button disabled={isPublishing || !isSubscribed} onClick={mqttUnsubscribe}>
            Unsubscribe
          </button>
          <button disabled={isPublishing || !isConnected} onClick={mqttDisconnect}>
            Disconnect
          </button>
        </div>
        <div>
          <button
            disabled={isPublishing || !isConnected || !isSubscribed}
            onClick={onPublish}
          >
            Start publishing from server
          </button>
        </div>
      </div>
      <MapComponent geoData={payload} />
    </Fragment>
  );
}
