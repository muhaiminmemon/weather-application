import React, { useState, useEffect } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import "../App.css";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  // Add an effect to trigger the fade-in when the component mounts
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
    setFadeIn(true); // Trigger fade-in when units are changed
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setFadeIn(true); // Trigger fade-in when search is clicked
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
        setFadeIn(true); // Trigger fade-in when location is clicked
      });
    }
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="Search for city...."
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
            onClick={() => setFadeIn(true)}
          />
          <UilSearch
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleSearchClick}
          />
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}
          />
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inputs;