import { useContext, useEffect, useState } from "react";
import GlobalInfo from "../services/context";
import CircularProgress from "@mui/material/CircularProgress";
import ShowWeather from "./ShowWeather";
import { fetchLatLon } from "../services/apis";

export default function ShowResult() {
  const { country,rajy, city, latLon, updateLatLon, updateMain } = useContext(GlobalInfo);
  const [isLoading, setLoading] = useState(false);
  const [isCountryLoading, setCountryLoading] = useState(false);
  const [latLonVal, setLatLonVal] = useState({ lat: latLon.lat, lon: latLon.lon });

  useEffect(()=>{
    if(country){
      setCountryLoading(true);
      updateMain("");
    }
    // eslint-disable-next-line
  },[country,rajy]);

  useEffect(() => {
    if(city) {
      setLoading(true);
      (async (city) => {
        const result = await fetchLatLon(city);
        setLatLonVal({ lat: result.lat, lon: result.lon });
        setLoading(false);
        setCountryLoading(false);
      })(city);
      
    }
    // eslint-disable-next-line
  }, [city]);

  useEffect(()=>{
      if(latLonVal){
          updateLatLon(latLonVal);
      };
      // eslint-disable-next-line
  },[latLonVal])

  const goDown = () =>{
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <div className="full-info">
      {isCountryLoading ?(
        <div className="header">
          <h1> Welcome To MyWeatherApp </h1>
            <h4>
              Select your location and get <b>Weather</b> details
            </h4>
            <i className="fas fa-hand-point-down smooth" onClick={()=>{goDown()}}></i>
        </div>
      ): isLoading ? (
          <div className="header">
            <CircularProgress color="inherit" />
          </div>
      ) : latLon.lat ? (
        <ShowWeather/>
      ) : (
        <div className="header">
          <h1> Welcome To MyWeatherApp </h1>
            <h4>
              Select your location and get <b>Weather</b> details
            </h4>
            <i className="fas fa-hand-point-down" onClick={()=>{goDown()}}></i>
        </div>
      )}
    </div>
  );
}
