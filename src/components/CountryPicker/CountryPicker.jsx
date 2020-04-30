import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountyPicker.module.css";

import { countries } from "../../api";

const CountryPicker = ({ handleOnChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await countries();
      console.log(data);
      if (data) {
        setFetchedCountries(data.countries);
      }
    };
    fetchCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={handleOnChange}>
        <option value="global">Global</option>
        {fetchedCountries.map(function (country, index) {
          return (
            <option value={country.name} key={index}>
              {country.name}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
