import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ShowWeather from "./ShowWeather";
import { fetchLatLon } from "../services/apis";
import Front from "./Front";

export default function ShowResult({weaMain, setWeaMain, city,setCountryLoading,isCountryLoading}) {
  console.log(isCountryLoading)
  const [isLoading, setLoading] = useState(false);
  const [latLonVal, setLatLonVal] = useState({ lat: null, lon: null });

  useEffect(() => {
    if(city.value) {
      setLoading(true);
      (async (city) => {
        const result = await fetchLatLon(city.value);
        setLatLonVal({ lat: result.lat, lon: result.lon });
        setLoading(false);
        setCountryLoading(false);
      })(city);
      
    }
    // eslint-disable-next-line
  }, [city.value]);

  console.log(isLoading)
  return (
    <div className="full-info">
      {isCountryLoading ?(
        <Front />
      ): isLoading ? (
          <div className="header">
            <CircularProgress color="inherit" />
          </div>
      ) : latLonVal.lat ? (
        <ShowWeather weaType={weaMain} setWeaType={setWeaMain} city={city} latLon={latLonVal}/>
      ) : (<Front/>
      )}
    </div>
  );
}
