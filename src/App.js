import { useState, useEffect } from "react";
import "./App.css";
import SearchCountry from "./components/SearchCountry";
import cold from "./pics/cold2.jpg";
import { urls } from "./services/urls";
import axios from "axios";
import States from './services/states';
import Loader from "./components/Loader";
import ShowResult from "./components/ShowResult";

// import Button from '@mui/material/Button';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const getItem = async () => {
      const result = await axios(urls.countryUrl);
      // console.log(result.data.data);
      setData(result.data.data);
      setLoading(false);
    };
    getItem();
  }, []);

  useEffect(()=>{

  },[])

  return (
    <States>
    <div className="App">
      {/* <Button variant="contained">Hello World</Button> */}
      <div className="container">
        <img src={cold} alt="season" />
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
        </div>
        <div className="show-results">
          <div className="results">
            <ShowResult/>
          </div>
        </div>
      </div>
    </div>
    </States>
  );
}

export default App;
