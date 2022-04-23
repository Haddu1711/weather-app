import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GlobalInfo from "../services/context";
// import ShowTemp from './ShowTemp';

function ShowWeather() {
  const { city, country, latLon, weaMain, updateMain } = useContext(GlobalInfo);
  const [isLoading, setLoading] = useState(false);
  const [tempr, setTemprature] = useState(0);
  const [weaIcon, setWeaIcon] = useState("");
  const [weaType, setWeaType] = useState(weaMain);
  const [weaTypeDesp, setWeaTypeDesp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [feelTemp, setFeelTemp] = useState("");
  const [cloud, setCloud] = useState("");
  const [wind, setWind] = useState("");
  const [pressure, setPressure] = useState("");
  const [visibility, setVisiblity] = useState("");
  const [humidity, setHumidity] = useState("");

  // console.log("we",weaData.main.temp);

  useEffect(() => {
    if (latLon.lat && latLon.lon) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=a882a41db72d137793456a056cedef50`;
      setLoading(true);
      const getItem = async (url) => {
        const result = await axios.get(url);
        // console.log(result.data);
        if (result.data.length !== 0) {
          // setWeaVal(result.data);
          setWeaIcon(result.data.weather[0].icon);
          setTemprature(result.data.main.temp);
          setMaxTemp(result.data.main.temp_max);
          setMinTemp(result.data.main.temp_min);
          setFeelTemp(result.data.main.feels_like);
          setWeaType(result.data.weather[0].main);
          setWeaTypeDesp(result.data.weather[0].description);
          setCloud(result.data.clouds.all);
          setWind(result.data.wind.speed);
          setPressure(result.data.main.pressure);
          setVisiblity(result.data.visibility);
          setHumidity(result.data.main.humidity);
          setLoading(false);
          
        }
        // console.log(weaVal);
        // setLoading(false);
      };
      getItem(weatherUrl);
    }
  }, [latLon.lat, latLon.lon]);

  useEffect(() => {
    if (weaType) {
      updateMain(weaType);
      // setTemprature(weaVal.main.temp)
    }
    // eslint-disable-next-line
  }, [weaType]);

  return (
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
                        src={`http://openweathermap.org/img/wn/${weaIcon}.png`}
                        alt="mood"
                    />
                    </div>
                    <h3>
                        {(tempr - 273.15).toFixed(2)} <span> &#730;C </span>
                    </h3>
                </div>
                <div className="other-det">
                    <h3>
                        {weaType}, {weaTypeDesp}
                    </h3>
                </div>
                <div className="other-sec">
                    <div className="section-1">
                        <div className="min-temp">
                            <h4><i className="fal fa-temperature-low"></i> Min Temp</h4>
                            <h3>{(minTemp - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                        
                        <div className="max-temp">
                            <h4><i className="fal fa-temperature-high"></i> Max Temp</h4>
                            <h3>{(maxTemp - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                    </div>
                    <div className="section-1">
                        <div className="feel-temp">
                            <h4>Feels Like</h4>
                            <h3>{(feelTemp - 273.15).toFixed(2)} &#730;C</h3>
                        </div>
                        <div className="pressure">
                            <h4><i className="fas fa-wind"></i> Pressure</h4>
                            <h3>{pressure} <span> hPa</span></h3>
                        </div>
                        
                    </div>
                    <div className="section-1">
                        <div className="humidity">
                            <h4><i className="fas fa-humidity"></i> Humidity</h4>
                            <h3>{humidity} %</h3>
                        </div>
                        
                        <div className="visiblity">
                            <h4><i className="fas fa-eye"></i> Visiblity</h4>
                            <h3>{(visibility / 1000).toFixed(2)} <span> km</span></h3>
                        </div>
                    </div>
                    <div className="section-1">
                        
                        <div className="cloud">
                            <h4><i className="fas fa-clouds"></i> Clouds</h4>
                            <h3>{cloud} %</h3>
                        </div>
                        <div className="wind">
                            <h4><i className="far fa-wind"></i> Wind</h4>
                            <h3>{(wind * 3.6).toFixed(1)} <span> km/h </span></h3>
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
