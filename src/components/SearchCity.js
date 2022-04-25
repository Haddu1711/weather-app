import React, { useEffect, useState } from "react";
import Select from "react-select";
import { urls } from "../services/urls";
import axios from "axios";
import { useContext } from "react";
import GlobalInfo from "../services/context";

export default function SearchState() {
  const { country, rajy, city, updateCity } = useContext(GlobalInfo);
  const [cityData, setCityData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [cityVal, setCityVal] = useState(city);
//   console.log("city",city);

  useEffect(()=>{
    setCityVal("");
  },[country])
  useEffect(() => {
    if (country && rajy) {
      setCityVal("")
    //   console.log("inside cty", country, rajy);
      setLoading(true);
      const getItem = async (country, rajy) => {
        let sendData = {
          country: `${country}`,
          state: `${rajy}`,
        };
        const result = await axios.post(urls.cityUrl, sendData);
        // console.log(result.data.data);
        setCityData(result.data.data);
        setLoading(false);
      };
      getItem(country, rajy);
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
