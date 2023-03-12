import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { Main, Asside } from "../components";
import Sponsors from "../components/Sponsors";
import { MapElem } from "../components/MapElem";

import "../styles/home.css";
import "../styles/airIndex.scss";


function Home() {
  const { t } = useTranslation();
  document.title = `Carboleon - ${t("Home.pageTitle")}`;

  const [mainData, setMainData] = useState(null);
  const [pollution, setPollution] = useState(null);
  const [errorInfo, setErrorInfo] = useState(false);
  const [coords, setCoords] = useState(null);
  const locationRef = useRef(null)

  const api = {
    weatherCurrentApi: "https://api.openweathermap.org/data/2.5/weather?",
    geolocationApi: "https://api.openweathermap.org/geo/1.0/direct?",
    weatherForecastApi: "https://api.openweathermap.org/data/2.5/forecast?",
  };

  const setSearchingLocation = async (location) => {
      const geolocate = await fetch(
        `${api.geolocationApi}q=${location}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
      ).then((res) => res.json());
      if (!geolocate.length) {
        setErrorInfo(true);
      } else {
        const lat = geolocate[0].lat;
        const lon = geolocate[0].lon;
        setErrorInfo(false);
        const currentWeatherData = await fetch(
          `${api.weatherCurrentApi}lat=${lat}&lon=${lon}&units=metric&lang=${t(
            "test.len"
          )}&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
        ).then((res) => res.json());
  
        const forecastWeatherData = await fetch(
          `${api.weatherForecastApi}lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
        ).then((res) => res.json());
  
        const pollutionData = await fetch(
          `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${process.env.REACT_APP_API_KEY_WAQI}`
        ).then((res) => res.json());
  
        const city = geolocate[0].name;
        const country = geolocate[0].country;
        const fullCity = { city, country };
        setPollution(pollutionData.data);
        setCoords([lat, lon]);
        setMainData({ currentWeatherData, forecastWeatherData, fullCity });
        locationRef.current.value = null
        localStorage.setItem("city", location);
      }
  }

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setSearchingLocation(locationRef.current.value);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("city"))
      setSearchingLocation(localStorage.getItem("city"));
    else setSearchingLocation("Warszawa");
  }, []);

  return (
    <>
      <div className="background-img">
        <h1>CarboLeon</h1>
        <h1>{t("Home.title")}</h1>
      </div>
      <div className="margin">
      <div className="container">
          <div className="asside">
            {pollution && <Asside pollution={pollution} />}
          </div>

          <div className="home-main">
            <div className="search">
              <FaSearch />
              <input
                type="text"
                placeholder={t("Home.input")}
                ref={locationRef}
                onKeyDown={searchLocation}
              />
            </div>
            {errorInfo && <h1 className="error">{t("Home.error")}</h1>}
            {mainData && <Main mainData={mainData} />}
          </div>
        </div>
        <div className="main-map-container">
          <div className="main-map-elem">
            {coords && <MapElem coords={coords} />}
          </div>
        </div>
      </div>
        
      <Sponsors />
    </>
  );
}

export default Home;
