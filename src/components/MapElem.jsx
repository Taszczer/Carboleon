import React from "react";
import "../styles/geosearch.css";
import "../styles/map.css";
import "../styles/LeafletCSS&IMG/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, useMap, FeatureGroup, TileLayer, LayersControl, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import icon from "../styles/LeafletCSS&IMG/icon";
import { EditControl } from "react-leaflet-draw";
import osm from "../pages/osm-providers.js";
// import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import Legenda from "./Legenda";
import { useTranslation } from "react-i18next";

export const MapElem = () => {
  const { t } = useTranslation();

  const mapBounds = [
    [-90, -180],
    [90, 180],
  ];

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconSize: [60, 80],
    iconAnchor: [29, 80],
    iconRetinaUrl:
       "https://www.linkpicture.com/q/Logo_geolocation.png",
    iconUrl:
      "https://www.linkpicture.com/q/Logo_geolocation.png",
      shadowUrl: ""
  });

  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const _created = (e) => console.log(e);
  const Search = (props) => {
    const map = useMap();
    const { provider } = props;

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          icon,
        },
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [props]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={[52.19871873744634, 21.02099770335431]}
        maxBounds={mapBounds}
        zoom={10}
        minZoom={3}
      >
        <FeatureGroup>
          <EditControl
            position="bottomright"
            onCreated={_created}
            draw={
              {
                /* rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false, */
              }
            }
          />
        </FeatureGroup>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap="true"
        />
        <LayersControl>
          <LayersControl.Overlay name={t("layer.satelite")}>
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              noWrap={true}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name={t("layer.topographicMap")}>
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              noWrap={true}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name={t("layer.airports")}>
            <TileLayer
              url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              attribution='Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              noWrap={true}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name={t("layer.airPollution")}>
            <TileLayer
              url={`https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${process.env.REACT_APP_API_KEY_WAQI}`}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              attribution='Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              noWrap={true}
            />
          </LayersControl.Overlay>
        </LayersControl>
         <Search provider={new OpenStreetMapProvider()}>
            <Marker>
            </Marker>
            </Search> 
        <Legenda />
        {/* <MinimapControl position="topright" /> */}
      </MapContainer>
    </>
  );
};
export default MapElem;
// TWÓRCA: BARTOSZ GRZYB MASTER / Legenda: AloeS and John333🔥
