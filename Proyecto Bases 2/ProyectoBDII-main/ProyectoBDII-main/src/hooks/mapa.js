import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapContainer = (loc) => {

  console.log(loc);
    const { location } = loc;

    // console.log(location);

    const [objData] = location;
    if (objData !== undefined) {
    const { location: defaultCenter } = objData;
    // console.log(defaultCenter);
    const mapStyles = {
      height: "75vh",
      width: "100%"
    };

    if (location !== undefined) {
      return (
        <LoadScript
          googleMapsApiKey='AIzaSyBzXpoRI0f3tsQ06NfcVPjUaBP_zrXK6WM'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}>
            {
              location.map(item => {
                return (
                  <Marker key={item.name} position={item.location} />
                )
              })
            }
          </GoogleMap>
        </LoadScript>
      )
    }
    return (<div></div>)
  }
  return (<div></div>)
}