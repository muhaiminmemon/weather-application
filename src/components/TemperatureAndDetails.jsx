import React, { useState, useEffect } from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";
import {iconUrlFromCode } from "../services/weatherService";
import "../App.css"; 

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    speed,
    humidity,
    feels_like,
  },
}) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Trigger the fade-in effect when the component mounts
  }, []);

  return (
    <div className={`temperature-details ${fadeIn ? "fade-in" : ""}`}>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels Like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default TemperatureAndDetails;