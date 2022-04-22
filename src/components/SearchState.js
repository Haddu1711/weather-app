import React, { useEffect, useState } from "react";
import Select from "react-select";
import { urls } from "../services/urls";
import axios from "axios";
import { useContext } from "react";
import GlobalInfo from "../services/context";
import SearchCity from "./SearchCity";

export default function SearchState() {
  const { country, rajy, updateState } = useContext(GlobalInfo);
  const [stateData, setStateData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [stateVal, setStateVal] = useState(rajy);
  // const [isCountryLoading, setCountryLoading] = useState(false);
  
  // console.log(rajy);
  useEffect(() => {
    if (country) {
      // setCountryLoading(true);
    //   console.log("inside state:", country);
      setLoading(true);
      const getItem = async (country) => {
        let sendData = {
          country: `${country}`,
        };
        const result = await axios.post(urls.stateUrl, sendData);
        // console.log(result.data.data.states);
        setStateData(result.data.data.states);
        // setCountryLoading(false)
        setLoading(false);
      };
      getItem(country);
    }
  }, [country]);
  
  useEffect(() => {
    if (stateVal) {
      //   console.log(stateVal);
      
      setStateVal(stateVal);
      updateState(stateVal);
    }
    // eslint-disable-next-line
}, [stateVal]);

  const options = stateData.map((ele) => ({label: ele.name, value: ele.name}));
  return (
    <div className="spinner">
      <Select
        // value={isCountryLoading? null : rajy}
        placeholder="Select State"
        options={options}
        onChange={(opt) => {
          setStateVal(opt.value);
        }}
        isLoading={isLoading ? true : null}
        noOptionsMessage={()=> "States not found!!!"}
      />
      <SearchCity/>
    </div>
  );
}
