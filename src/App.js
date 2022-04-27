import { useState } from "react";
// import { useState, useEffect, useContext } from "react";
import "./App.css";
import Address from "./components/Address";
// import SearchCountry from "./components/SearchCountry";
// import { fetchCountry } from "./services/apis";
// import Loader from "./components/Loader";
import ShowResult from "./components/ShowResult";
// import GlobalInfo from "./services/context";
// import SearchState from "./components/SearchState";
// import SearchCity from "./components/SearchCity";



// images
import default1 from "./pics/default1.jpg";
import clear from "./pics/clear.jpg";
import cloud from "./pics/clouds.jpg";
import drizzle from "./pics/Drizzle.jpg";
import dust from "./pics/dust.jpg";
import fog from "./pics/fog.jpg";
import rainy from "./pics/rainy.jpg";
import sand from "./pics/sand.jpg";
import snow from "./pics/snow.jpg";
import squall from "./pics/Squall.jpg";
import thunder from "./pics/Thunderstorm.jpg";
import tornado from "./pics/Tornado.jpg";


function App() {
  // const { weaMain } = useContext(GlobalInfo);
  const [weaMain, setWeaMain] = useState("");
  const [city, setCity] = useState("");
  // const [data, setData] = useState([]);
  const [isCountryLoading, setCountryLoading] = useState(false);
  
  const pic_dict = {
    "Clear" : clear,
    "Clouds": cloud,
    "Drizzle": drizzle,
    "Dust": dust,
    "Ash": dust,
    "Fog": fog,
    "Mist": fog,
    "Smoke": fog,
    "Haze": fog,
    "Rain": rainy,
    "Sand": sand,
    "Snow": snow,
    "Squall": squall,
    "Thunderstorm": thunder,
    "Tornado": tornado,
    "":default1
  }

  // useEffect(() => {
    
  //   (async () => {
  //     const result = await fetchCountry();
  //     setData(result);
  //     setLoading(false);
  //   })();

  // }, []);


  const goTop = () => {
    window.scrollTo(0, -document.body.scrollHeight);
  }

  return (
    <div className="App">
      <div className="container">
        <img src={pic_dict[weaMain]} alt="season" />
        <div className="details">
          <div className="detail-info">
            <div className="header">
            <h1>MyWeatherApp</h1>
            </div>
            <div className="title">
              <h2>Select Location</h2>
            </div>
            <div className="country">

              <Address city={city} setCity={setCity} setWeaMain={setWeaMain} setCountryLoading={setCountryLoading}/>
            </div>
              
          </div>
          <div className="backTop">
            <i className="fas fa-space-shuttle" onClick={()=>{goTop()}}></i>
          </div>
        </div>
        <div className="show-results">
          <div className="results">
            <ShowResult weaMain={weaMain} setWeaMain={setWeaMain} city={city} isCountryLoading={isCountryLoading} setCountryLoading={setCountryLoading}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
