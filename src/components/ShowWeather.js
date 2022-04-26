import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";
import { fetchWeather } from "../services/apis";
import GlobalInfo from "../services/context";

function ShowWeather() {
  const { city, country, latLon, weaMain, updateMain } = useContext(GlobalInfo);
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [weaType, setWeaType] = useState(weaMain);

  useEffect(() => {
    console.log("effect");
    if (latLon.lat && latLon.lon) {
      setLoading(true);
      ( async (lat, lon) => {
        const res = await fetchWeather(lat, lon);
        if(JSON.stringify(result)!== JSON.stringify(res)){
          setResult(res);           
          setWeaType(res.weather[0].main);
          setLoading(false);
        }
        
      })(latLon.lat, latLon.lon);
    }
    // eslint-disable-next-line
  }, [latLon.lat, latLon.lon]);

  useEffect(() => {
    if (weaType) {
      updateMain(weaType);
      // setTemprature(weaVal.main.temp)
    }
    // eslint-disable-next-line
  }, [weaType]);

  return (
    result === null ? <></> :
    <div className="all-details">
      <div className="showing">
        <h1>Current Weather</h1>
        <div className="location">
          <h3>
        <i className="fas fa-map-marker-alt"></i>
            {" "}
            {city}, {country}
          </h3>
        </div>
      </div>
      <div className="temprature">
        {/* <ShowTemp /> */}
        <div className="tempr">
          {/* <div className="mode-img">
                </div> */}
          {isLoading ? (
            <center>
              {" "}
              <CircularProgress />{" "}
            </center>
          ) : (
            <div className="temp-int">
                <div className="temp-det">
                    <div className="temp-img">
                    <img
                        src={`http://openweathermap.org/img/wn/${result?.weather[0].icon}.png`}
                        alt="mood"
                    />
                    </div>
                    <h3>
                        {(result?.main.temp - 273.15).toFixed(2)} <span> &#730;C </span>
                    </h3>
                </div>
                <div className="other-det">
                    <h3>
                        {weaType}, {result?.weather[0].description}
                    </h3>
                </div>
                <div className="other-sec">
                    <div className="section-1">
                        <div className="min-temp">
                            <h4><i className="fal fa-temperature-low"></i> Min Temp</h4>
                            <h3>{(result?.main.temp_min - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                        
                        <div className="max-temp">
                            <h4><i className="fal fa-temperature-high"></i> Max Temp</h4>
                            <h3>{(result?.main.temp_max - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                    </div>
                    <div className="section-1">
                        <div className="feel-temp">
                            <h4>Feels Like</h4>
                            <h3>{(result?.main.feels_like - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                        <div className="pressure">
                            <h4><i className="fas fa-wind"></i> Pressure</h4>
                            <h3>{result?.main.pressure} <span> hPa</span></h3>
                        </div>
                        
                    </div>
                    <div className="section-1">
                        <div className="humidity">
                            <h4><i className="fas fa-humidity"></i> Humidity</h4>
                            <h3>{result?.main.humidity} %</h3>
                        </div>
                        
                        <div className="visiblity">
                            <h4><i className="fas fa-eye"></i> Visiblity</h4>
                            <h3>{(result?.visibility / 1000).toFixed(2)} <span> km</span></h3>
                        </div>
                    </div>
                    <div className="section-1">
                        
                        <div className="cloud">
                            <h4><i className="fas fa-clouds"></i> Clouds</h4>
                            <h3>{result?.clouds.all} %</h3>
                        </div>
                        <div className="wind">
                            <h4><i className="far fa-wind"></i> Wind</h4>
                            <h3>{(result?.wind.speed * 3.6).toFixed(1)} <span> km/h </span></h3>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowWeather;

// weather = result.data.weather[0]
// main = result.data.main
// clouds = result.data.clouds
// wind = result.data.wind
