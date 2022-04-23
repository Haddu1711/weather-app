import GlobalInfo from "./context";
import { useState } from "react";

const States = (props) =>{
    const [selectCountry, setCountry] = useState('');
    const [selectState, setState] = useState('');
    const [selectCity, setCity] = useState('');
    const [latLon, setLetLon] = useState({lat:null,lon:null});
    const [weaMain, setWeaMain] = useState("");
    

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

    const updateMain = (val) => {
        setWeaMain(val);
    }

    return (
        <GlobalInfo.Provider value={{country:selectCountry, rajy:selectState, city:selectCity, latLon, weaMain, updateCity, updateCountry, updateState, updateLatLon, updateMain}}>
            {props.children}
        </GlobalInfo.Provider>
    )
}

export default States