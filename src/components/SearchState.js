import React, { useEffect, useState } from "react";
import Select from "react-select";
import { urls } from "../services/urls";
import axios from "axios";
import { useContext } from "react";
import GlobalInfo from "../services/context";
import SearchCity from "./SearchCity";

export default function SearchState() {
  const { country, rajy, updateState, updateCity } = useContext(GlobalInfo);
  const [stateData, setStateData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [stateVal, setStateVal] = useState(rajy);

  // const [selstateVal, setSelStateVal] = useState("");
  
  useEffect(() => {
    if (country) {
      setStateVal("");
      setLoading(true);
      const getItem = async (country) => {
        let sendData = {
          country: `${country}`,
        };
        const result = await axios.post(urls.stateUrl, sendData);
        setStateData(result.data.data.states);
        setLoading(false);
      };
      getItem(country);
    }
  }, [country]);
  
  useEffect(() => {
    if (stateVal) {
      updateState(stateVal.value);
      updateCity("");
      // setStateVal(stateVal)
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
        value={stateVal}
        onChange={(opt) => {
          setStateVal(opt);
        }}
        isLoading={isLoading ? true : null}
        noOptionsMessage={()=> "States not found!!!"}
      />
      <SearchCity/>
    </div>
  );
}
