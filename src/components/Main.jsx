import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { TbWind, TbTemperature } from "react-icons/tb";
import { WiHumidity, WiBarometer } from "react-icons/wi";

const days = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];
const months = [
  "Grudzień",
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const Main = ({ currentData, forecastData, date }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  function Clicky(){
      if(!isDropdown){
          setIsDropdown(true)
      } else{
          setIsDropdown(false)
      }
  }
  return (
    <div className="weather-params">
      <div className="current-temp">
        <div>
          <div>
            <p className="city">
              {currentData.name}, {currentData.sys.country}
            </p>
            <p className="weather-description">
              {currentData.weather[0].description}{days[date.getUTCDate() - 1]}, {date.getUTCDate()}{" "} {months[date.getMonth() + 1]}{" "}
            </p>
            <p>
            </p>
          </div>
          <p className="temp">{Math.round(currentData.main.temp)} °C </p>
          {/* <p className="temp">jakość powietrza: </p>  to jest do zrobienia*/}
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${currentData.weather[0].icon}.png`}
        />
      </div>
      <div>
        <button onClick={Clicky} className='reveal-button'>
          <p>Kliknij mnie żeby {isDropdown ? "zchować" : "rozwinąć"} detale</p>
          <div>
            <p>{isDropdown ? "\u2227" : "\u2228"}</p>
          </div>
          </button>
        <div className={`${isDropdown ? "contain" : ""}`}>
          <div className="noShow">
            <div className="air-conditions">
              <p className="title">Detale Pogodowe</p>
              <div className="details">
                <div>
                  <div className="prop-title">
                    {/* <WiBarometer  className="detail-icons"/> */}
                    {/* <span>Ciśnienie</span> */}
                  </div>
                  <h3><WiBarometer  className="detail-icons"/><span>Ciśnienie</span><br/><br/>{Math.round(currentData.main.pressure)} hPa</h3>
                </div>
                <div>
                  <div className="prop-title">

                  </div>
                  <h3><WiHumidity className="detail-icons"/><span>Wilgotność</span><br/><br/>{Math.round(currentData.main.humidity)} %</h3>
                </div>
                <div>
                  <div className="prop-title">

                  </div>
                  <h3><TbWind className="detail-icons"/><span>Wiatr</span><br/><br/>{Math.round(currentData.wind.speed)} m/h</h3>
                </div>
                <div>
                  <div className="prop-title">

                  </div>
                  <h3><TbTemperature className="detail-icons"/><span>Odczuwalna Temperatura</span><br/><br/>{Math.round(currentData.main.feels_like)} °C</h3>
                </div>
              </div>
            </div>
            <div className="forecast-weather">
              <p className="title">Zapowiadana Pogoda</p>
              <Splide
                options={{
                  perPage: 4,
                  arrows: false,
                  pagination: false,
                  frag: "free",
                }}
                className="splide"
              >
                {forecastData.map((x, index) => (
                  <SplideSlide key={index} className="splide-slide">
                    <p className="time-info">
                      {days[new Date(x.dt * 1000).getUTCDate() - 1]}
                    </p>
                    <p className="time-info">
                      {new Date(x.dt * 1000).getUTCDate()}{" "}
                      {months[new Date(x.dt * 1000).getMonth() + 1]} |{"  "}
                      {new Date(x.dt * 1000)
                        .toLocaleTimeString(undefined)
                        .slice(0, 5)}
                    </p>
                    <img src={`icons/${x.weather[0].icon}.png`} alt="weather-icon" />
                    <p className="temp">
                      {Math.round(x.main.temp_min + x.main.temp_max) / 2} °C
                    </p>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
