import React, { useState, useEffect } from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Toronto",
    },
    {
      id: 2,
      title: "Ottawa",
    },
    {
      id: 3,
      title: "Delhi",
    },
    {
      id: 4,
      title: "London",
    },
    {
      id: 5,
      title: "Karachi",
    },
  ];

  // Add state to control the fade-in effect
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger the fade-in effect when the component mounts
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`top-buttons ${fadeIn ? "fade-in" : ""}`}>
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;