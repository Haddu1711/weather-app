import React from "react";

export default function Front() {
  const goDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  
  return (
    <div className="header">
      <h1> Welcome To MyWeatherApp </h1>
      <h4>
        Select your location and get <b>Weather</b> details
      </h4>
      <i
        className="fas fa-hand-point-down smooth"
        onClick={() => {
          goDown();
        }}
      ></i>
    </div>
  );
}
