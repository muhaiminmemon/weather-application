import React, { useEffect, useState } from "react";
import getFormattedWeatherData, { showInvalidCityPopup } from "./services/weatherService";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import "./App.css";

function App() {
  const [query, setQuery] = useState({ q: "Toronto" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  const handleFadeIn = () => {
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 500); // Add a delay to setFadeIn(false)
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setFadeIn(false); // Start the fade-out effect
        setTimeout(() => {
          setWeather(data); // After a delay, update the weather data
          setErrorMessage(""); // Clear any previous error messages
          setFadeIn(true); // Start the fade-in effect
        }, 500); // Set this delay to match the duration of your CSS transition
      } catch (error) {
        // Handle the error and show a popup message
        showInvalidCityPopup();
        setErrorMessage(<div style={{ color: 'white' }}>Please enter a valid city name.</div>);
      }
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "#13BCEE"; // Initial background color
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "#6913EE "; // Background color when the temperature is lower
    return "#EE6213"; // Background color when the temperature is higher
  };

  return (
    <div className={`App ${fadeIn ? "active" : ""}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: 'white' }}>
      <div className={`mx-auto max-w-screen-md mt-0 py-10 px-32 h-fit shadow-2xl shadow-gray-400`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: formatBackground(), transition: 'background-color 0.5s ease' }}>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} handleFadeIn={handleFadeIn} />

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {weather && (
          <div className={`fade-in ${fadeIn ? "active" : ""}`}>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;