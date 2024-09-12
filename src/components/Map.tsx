import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchCountriesData } from "../utility/fetchCountriesData";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent: React.FC = () => {
  const {
    data: countriesData,
    isLoading,
    error,
  } = useQuery("countriesData", fetchCountriesData);

  if (isLoading) return <div>Loading Map...</div>;
  if (error) return <div>Error loading map data</div>;

  return (
    <>
      <h1 className="text-center text-xl font-semibold mb-4">Map</h1>
      <div className="relative w-full h-80 md:h-[calc(100vh-5rem)] z-0">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData.map((country: any) => (
            <Marker
              key={country.countryInfo.iso2}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h3>{country.country} </h3>
                  <p>Active: {country.active.toLocaleString()}</p>
                  <p>Recovered: {country.recovered.toLocaleString()}</p>
                  <p>Deaths: {country.deaths.toLocaleString()}</p>
                </div>
              </Popup>
              <Tooltip>{country.country}</Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
