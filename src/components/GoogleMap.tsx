
import React from 'react';

interface GoogleMapProps {
  address: string;
  apiKey?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address, apiKey }) => {
  // Encode the address for use in the URL
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className="w-full h-80 rounded-lg overflow-hidden shadow-md border">
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey || 'AIzaSyC1pfWmSU6gliEPwguLELr-lIwXjAa_X7U'}&q=${encodedAddress}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMap;
