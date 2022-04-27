import { useEffect, useState } from "react";
import { fetchCountry, fetchStates, fetchCity } from "../services/apis";
import Loader from "./Loader";
import Select from "react-select";


function Address({city,setCity,setWeaMain,setCountryLoading}) {
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [isLoading, setLoading] = useState("");


  //   fetching countries
  useEffect(() => {
    (async () => {
      const result = await fetchCountry();
      setCountryData(result);
      setLoading("false");
    })();
  }, []);

  //   fetching states
  useEffect(() => {
      if (country) {
      setState("");
      setCity("");
      setWeaMain("");
      setCountryLoading(true);
      setLoading("state");
      (async (country) => {
        const result = await fetchStates(country.value);
        setStateData(result);
        setLoading("false");
      })(country);
    }
    // eslint-disable-next-line
  }, [country]);

//   console.log(typeof(state));
  useEffect(() => {
      if (country && state) {
        setCity("");
        setWeaMain("");
        setCountryLoading(true);
        setLoading("city");
        (async (country, state) => {
          const result = await fetchCity(country.value, state.value);
          setCityData(result);
        setLoading("false");
        })(country, state);
      }
    // eslint-disable-next-line
  }, [state]);


  //   countries options
  const countryOtions = countryData.map((ele) => ({
    label: ele.name,
    value: ele.name,
  }));

  //   state options
  const stateOptions = stateData.map((ele) => ({
    label: ele.name,
    value: ele.name,
  }));

  // cities options
  const cityOptions = cityData.map((ele) => ({ label: ele, value: ele }));


  return isLoading === "" ? (
    <Loader />
  ) : (
    <div>
      <div className="spinner">
        <Select
          placeholder="Select Country"
          options={countryOtions}
          onChange={(opt) => {
            setCountry(opt);
          }}
        //   value={country}
          noOptionsMessage={() => "Countries not found!!!"}
        />
      </div>

      <div className="spinner">
        <Select
          placeholder="Select State"
          options={stateOptions}
          value={state}
          onChange={(opt) => {
            setState(opt);
          }}
          isLoading={isLoading==="state"}
          noOptionsMessage={() => "States not found!!!"}
        />
      </div>

      <div className="spinner">
        <Select
          placeholder="Select City"
          options={cityOptions}
          onChange={(opt) => {
              setCity(opt)
            }}
          value={city}
          isLoading={isLoading==="city"}
        //   isLoading={isLoading}
          noOptionsMessage={() => "Cities not found!!!"}
        />
      </div>
    </div>
  );
}

export default Address;
