import axios from "axios";

export const fetchCountry = async () => {
    const result = await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");
    return result.data.data;
}

export const fetchStates = async (country) =>{
    const result = await axios.get(`https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`);
    return result.data.data.states;
}

export const fetchCity = async (country, state) => {
    const result = await axios.get(`https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${country}&state=${state}`);
    return result.data.data;
}

export const fetchLatLon = async (city) => {
    const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a882a41db72d137793456a056cedef50`);
    return result.data[0];
}

export const fetchWeather = async (lat, lon) => {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a882a41db72d137793456a056cedef50`);
    return result.data;
}