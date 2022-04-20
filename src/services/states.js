import GlobalInfo from "./context";
import { useState } from "react";

const States = (props) =>{
    const [selectCountry, setCountry] = useState('');
    const [selectState, setState] = useState('');
    const [selectCity, setCity] = useState('');

    const updateCity = (val) => {
        setCity(val);
    }
    const updateState = (val) => {
        setState(val);
    }
    const updateCountry = (val) => {
        setCountry(val);
    }
    return (
        <GlobalInfo.Provider value={{country:selectCountry, rajy:selectState, city:selectCity, updateCity, updateCountry, updateState}}>
            {props.children}
        </GlobalInfo.Provider>
    )
}

export default States