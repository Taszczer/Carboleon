import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { TbWind, TbTemperature } from "react-icons/tb";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Main = (mainData) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [splideRows, setSplideRows] = useState(4);
  const currentData = mainData.mainData.currentWeatherData;
  const forecastData = mainData.mainData.forecastWeatherData.list;
  const fullCity = mainData.mainData.fullCity;
  const date = new Date();
  const { t } = useTranslation();
  const resizeSplideRows = () => {
    if (window.innerWidth > 1500) setSplideRows(4);
    else if (window.innerWidth < 1500 && window.innerWidth > 900)
      setSplideRows(3);
    else if (window.innerWidth < 900 && window.innerWidth > 550)
      setSplideRows(2);
    else setSplideRows(1);
  };

  window.addEventListener("resize", resizeSplideRows);

  /* Jak coś to na stronce https://openweathermap.org/weather-conditions w sekcji "weather condition codes" w kolumnie main są nazwy pogody.
  
  W object "weatherTips" wystarczy dać nazwę pogody jako key.
  
  Ponieważ jest random, to obok key dodaj liczbe w zakresie od 1-ilosctekstow, wtedy przy danej wylosowanej liczbie będzie dany tekst
  
  jeśli zmienisz ilość zranodmowyzowanych wypowiedzi to zmień też iloscTekstow*/

  const iloscTekstow = 3;
  const weatherTipsDay = {
    Thunderstorm1:
      "Zostań w domu - jest burza. Najlepiej napij się ciepłej herbatki :D",
    Clouds1: "Jest pochmurno, zalecane jest zostać w domu",
    Rain1: "Pada deszcz napij się herbatki",
    Clear1: "Jest Ładna pogoda, warto wyjść na zewnątrz",
    Thunderstorm2:
      "Zostań w domu - jest burza. Najlepiej napij się ciepłej herbatki :D",
    Clouds2: "Jest pochmurno, zalecane jest zostać w domu",
    Rain2: "Pada deszcz napij się herbatki",
    Clear2: "Jest Ładna pogoda, warto wyjść na zewnątrz",
    Thunderstorm3:
      "Zostań w domu - jest burza. Najlepiej napij się ciepłej herbatki :D",
    Clouds3: "Jest pochmurno, zalecane jest zostać w domu",
    Rain3: "Pada deszcz napij się herbatki",
    Clear3: "Jest Ładna pogoda, warto wyjść na zewnątrz",
  };

  const weatherTipNight = "Dobranoc";
  let isDay = true;
  // const timetest  =() =>{

  // PROSZĘ TEGO NIE USUWAĆ
  // var input = currentData.dt * 1000;

  // let ok = currentData.dt * 1000
  // console.log(ok)
  // console.log(new Date(ok).toLocaleTimeString());

  // console.log(new Date(ok).toTimeString());
  // console.log(new Date(ok).toLocaleTimeString());
  // console.log(currentData)
  // console.log(currentData.timezone)
  // console.log(date.getHours())
  // console.log(currentData.timezone / 3600)
  // console.log(new Date(currentData.dt * 1000))
  // console.log(new Date((currentData.sys.sunset + currentData.timezone) * 1000))
  // }
  //    console.log(currentData)
  useEffect(() => {
    resizeSplideRows();
  }, []);

  return (
    <div className="weather-params">
      <div className="current-temp">
        <div>
          <div>
            <p className="city">
              {fullCity.city}, {fullCity.country}
            </p>
            <p className="weather-description">
              {currentData.weather[0].description}
            </p>
            <p>
              {t(`Days.${[date.getDay()]}.day`)}, {date.getUTCDate()}{" "}
              {t(`Months.${[date.getMonth() + 1]}.mont`)}{" "}
            </p>
          </div>
          <p className="temp">{Math.round(currentData.main.temp)} °C </p>
        </div>
        <div>
          <p>
            {isDay
              ? weatherTipsDay[
                  `${currentData.weather[0].main}${Math.floor(
                    Math.random() * iloscTekstow + 1
                  )}`
                ]
              : weatherTipNight}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`images/webpicons/${currentData.weather[0].icon}.webp`}
        />
      </div>
      <div className="forecast-weather">
        <p className="title">{t("Home.Fore")}</p>
        <Splide
          options={{
            perPage: splideRows,
            arrows: false,
            pagination: false,
            frag: "free",
          }}
          className="splide"
        >
          {forecastData.map((x, index) => (
            <SplideSlide key={index} className="splide-slide">
              <p className="time-info">
                {t(`Days.${[new Date(x.dt * 1000).getDay()]}.day`)}
              </p>
              <p className="time-info">
                {new Date(x.dt * 1000).getUTCDate()}{" "}
                {t(`Months.${[date.getMonth() + 1]}.mont`)} |{"  "}
                {new Date(x.dt * 1000)
                  .toLocaleTimeString(undefined)
                  .slice(0, 5)}
              </p>
              <img
                src={`images/webpicons/${x.weather[0].icon}.webp`}
                alt="weather-icon"
              />
              <p className="temp">
                {Math.round(x.main.temp_min + x.main.temp_max) / 2} °C
              </p>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <button
        onClick={() => setIsDropdown(!isDropdown)}
        className="reveal-button"
      >
        <p>
          {t("Home.part1")}{" "}
          {isDropdown ? `${t("Home.hide")}` : `${t("Home.show")}`}{" "}
          {t("Home.part2")}
        </p>
        {isDropdown ? (
          <IoIosArrowDropdownCircle className="dropdown-icon rotate" />
        ) : (
          <IoIosArrowDropdownCircle className="dropdown-icon" />
        )}
      </button>
      {isDropdown && (
        <div className="air-conditions">
          <p className="title">{t("Home.weatherDet")}</p>
          <div className="details">
            <div>
              <div className="prop-title">
                <WiBarometer />
                <span>{t("Home.presure")}</span>
              </div>
              <h3 className="measurement">
                {Math.round(currentData.main.pressure)} hPa
              </h3>
            </div>
            <div>
              <div className="prop-title">
                <WiHumidity />
                <span>{t("Home.hum")}</span>
              </div>
              <h3 className="measurement">
                {Math.round(currentData.main.humidity)} %
              </h3>
            </div>
            <div>
              <div className="prop-title">
                <TbWind />
                <span>{t("Home.wind")}</span>
              </div>
              <h3 className="measurement">
                {Math.round(currentData.wind.speed)} m/h
              </h3>
            </div>
            <div>
              <div className="prop-title">
                <TbTemperature />
                <span>{t("Home.sens")}</span>
              </div>
              <h3 className="measurement">
                {Math.round(currentData.main.feels_like)} °C
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

//twórca John333
