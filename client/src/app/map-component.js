import React, {useEffect, useState} from 'react';

import {Icon} from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';

const StartMarker = new Icon({iconUrl: './assets/start.svg', iconSize: [35, 35]});
const MoveMarker = new Icon({iconUrl: './assets/move.svg', iconSize: [35, 35]});
const EndMarker = new Icon({iconUrl: './assets/end.svg', iconSize: [35, 35]});

export default function MapComponent({geoData}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (geoData.id) {
      setData((oldData) => [...oldData, geoData]);
    }
  }, [geoData]);

  return (
    <MapContainer
      center={[38.9939493747, -77.0310178268]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        positions={data.map((point) => [
          point.geometry.coordinates[1],
          point.geometry.coordinates[0],
        ])}
      />
      {data.map((point, idx) => (
        <CustomMarker key={point.id} point={point} idx={idx} />
      ))}
    </MapContainer>
  );
}

function CustomMarker({point, idx}) {
  let Icon = StartMarker;

  if (idx > 0 && idx < 9) {
    Icon = MoveMarker;
  } else if (idx === 9) {
    Icon = EndMarker;
  }

  return (
    <Marker
      position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
      icon={Icon}
    >
      <Popup>{point.properties.title}</Popup>
    </Marker>
  );
}
