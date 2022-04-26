import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import GlobalInfo from "../services/context";

export default function SearchCountry({ data }) {

    const {country, updateCountry } = useContext(GlobalInfo)
    // console.log(country);
    const [selCountry, setSelCountry] = useState(country);

  useEffect(() => {
    if (selCountry) {
    //   console.log(selCountry);
      updateCountry(selCountry.value);
    }
    // eslint-disable-next-line
  }, [selCountry]);

  const options = data.map((ele) => ({ label: ele.name, value: ele.name }));
  return (
      <div className="spinner">
        <Select
          placeholder="Select Country"
          options={options}
          onChange={(opt) => {
            setSelCountry(opt);
          }}
          value={selCountry}
          noOptionsMessage={()=> "Countries not found!!!"}
        />
      </div>
  );
}
