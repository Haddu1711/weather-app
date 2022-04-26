import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useContext } from "react";
import GlobalInfo from "../services/context";
import { fetchStates } from "../services/apis";

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
      (async (country) => {
        const result = await fetchStates(country);
        setStateData(result);
        setLoading(false);
      })(country);

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
        placeholder="Select State"
        options={options}
        value={stateVal}
        onChange={(opt) => {
          setStateVal(opt);
        }}
        isLoading={isLoading ? true : null}
        noOptionsMessage={()=> "States not found!!!"}
      />
    </div>
  );
}
