import { useContext, useEffect, useState } from "react";
import GlobalInfo from "../services/context";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ShowWeather from "./ShowWeather";

export default function ShowResult() {
  const { country, city, latLon, updateLatLon } = useContext(GlobalInfo);
  const [isLoading, setLoading] = useState(false);
  const [isCountryLoading, setCountryLoading] = useState(false);
  const [latLonVal, setLatLonVal] = useState({ lat: latLon.lat, lon: latLon.lon });
//   console.log(latLon.lat, latLon.lon);

  useEffect(()=>{
    if(country){
      setCountryLoading(true);
    }
  },[country]);

  useEffect(() => {
    if(city) {
      const getLatUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a882a41db72d137793456a056cedef50`;
      setLoading(true);
      const getItem = async (url) => {
        const result = await axios.get(url);
        // console.log(result.data[0].lat);
        setLatLonVal({ lat: result.data[0].lat, lon: result.data[0].lon });
        setLoading(false);
        setCountryLoading(false);
      };
      getItem(getLatUrl);
    }
    // else{
    //   setLoading(true);
    // }
  }, [city]);

  useEffect(()=>{
      if(latLonVal){
          updateLatLon(latLonVal);
      };
      // eslint-disable-next-line
  },[latLonVal])


  return (
    <div className="full-info">
      {isCountryLoading ?(
      //   <div className="header">
      //   <CircularProgress color="inherit" />
      // </div>
        <div className="header">
          <h1> Welcome To MyWeatherApp </h1>
            <h4>
              Select your location and get <b>Weather</b> details
            </h4>
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
        </div>
      )}
    </div>
  );
}
