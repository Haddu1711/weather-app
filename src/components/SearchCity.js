import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useContext } from "react";
import GlobalInfo from "../services/context";
import { fetchCity } from "../services/apis";

export default function SearchCity() {
  const { country, rajy, city, updateCity } = useContext(GlobalInfo);
  const [cityData, setCityData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [cityVal, setCityVal] = useState(city);

  useEffect(()=>{
    setCityVal("");
  },[country])
  
  useEffect(() => {
    if (country && rajy) {
      setCityVal("")
      setLoading(true);
      (async (country, rajy) => {
        const result = await fetchCity(country,rajy);
        setCityData(result);
        setLoading(false);
      })(country, rajy);
    }
    // eslint-disable-next-line
  }, [rajy]);

  useEffect(() => {
      if (cityVal) {
      updateCity(cityVal.value);
    }
    // eslint-disable-next-line
  }, [cityVal]);

  const options = cityData.map((ele) => ({ label: ele, value: ele }));
  return (
    <div className="spinner">
      <Select
        placeholder="Select City"
        options={options}
        value={cityVal}
        onChange={(opt) => {
          setCityVal(opt);
        }}
        // isLoading={true}
        isLoading={isLoading ? true : null}
        noOptionsMessage={()=> "Cities not found!!!"}
      />
    </div>
  );
}
