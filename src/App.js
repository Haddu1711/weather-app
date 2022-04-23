import { useState, useEffect, useContext } from "react";
import "./App.css";
import SearchCountry from "./components/SearchCountry";
import { urls } from "./services/urls";
import axios from "axios";
import Loader from "./components/Loader";
import ShowResult from "./components/ShowResult";
import GlobalInfo from "./services/context";

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
  const { weaMain } = useContext(GlobalInfo);
  let pic;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  // set pics
  // if(weaMain === ''){
  //   pic = default1;
  // }
  if (weaMain === "Clear"){
    pic = clear;
  }
  else if (weaMain === "Clouds"){
    pic = cloud;
  }
  else if (weaMain === "Drizzle"){
    pic = drizzle;
  }
  else if (weaMain === "Dust" || weaMain === "Ash"){
    pic = dust;
  }
  else if (weaMain === "Fog" || weaMain === "Mist" || weaMain === "Smoke" || weaMain === "Haze" ){
    pic = fog;
  }
  else if (weaMain === "Rain"){
    pic = rainy;
  }
  else if (weaMain === "Sand"){
    pic = sand;
  }
  else if (weaMain === "Snow"){
    pic = snow;
  }
  else if (weaMain === "Squall"){
    pic = squall;
  }
  else if (weaMain === "Thunderstorm"){
    pic = thunder;
  }
  else if (weaMain === "Tornado"){
    pic = tornado;
  }
  else{
    pic = default1;
  }
  useEffect(() => {
    
    const getItem = async () => {
      const result = await axios(urls.countryUrl);
      // console.log(result.data.data);
      setData(result.data.data);
      setLoading(false);
    };
    getItem();
  }, []);

  const goTop = () => {
    window.scrollTo(0, -document.body.scrollHeight);
  }

  return (
    // <States>
    <div className="App">
      {/* <Button variant="contained">Hello World</Button> */}
      <div className="container">
        <img src={pic} alt="season" />
        <div className="details">
          <div className="detail-info">
            <div className="header">
            <h1>MyWeatherApp</h1>
            </div>
            <div className="title">
              <h2>Select Location</h2>
            </div>
            <div className="country">
              { isLoading ? <Loader/> : <SearchCountry data={data}/>}
            </div>
          </div>
          <div className="backTop">
            <i className="fas fa-space-shuttle" onClick={()=>{goTop()}}></i>
          </div>
        </div>
        <div className="show-results">
          <div className="results">
            <ShowResult/>
          </div>
        </div>
      </div>
    </div>
    // </States>
  );
}

export default App;
