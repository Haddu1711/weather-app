import GlobalInfo from "./context";
import { useState } from "react";

const States = (props) =>{
    const [selectCountry, setCountry] = useState('');
    const [selectState, setState] = useState('');
    const [selectCity, setCity] = useState('');
    const [latLon, setLetLon] = useState({lat:null,lon:null});
    const [temprature, setTemprature] = useState(0);
    

    const updateCity = (val) => {
        setCity(val);
    }
    const updateState = (val) => {
        setState(val);
    }
    const updateCountry = (val) => {
        setCountry(val);
    }

    const updateLatLon = (val) => {
        setLetLon({lat:val.lat, lon:val.lon})
    }

    const updateTemprature = (val) => {
        setTemprature(val);
    }


    return (
        <GlobalInfo.Provider value={{country:selectCountry, rajy:selectState, city:selectCity, latLon, temprature, updateCity, updateCountry, updateState, updateLatLon, updateTemprature}}>
            {props.children}
        </GlobalInfo.Provider>
    )
}

export default States