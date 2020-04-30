import React from "react";
import logo from "./logo.svg";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Chart from "./components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData } from "./api";

import imageSrc from "./images/image.png";

class App extends React.Component {
  state = {
    data: {
      confirmed: undefined,
      recovered: undefined,
      deaths: undefined,
      lastUpdate: undefined,
    },
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    if (fetchedData) {
      this.setState({ data: fetchedData });
    }
  }

  handleOnChange = async (e) => {
    const country = e.target.value;
    const fetchedData =
      country === "global" ? await fetchData() : await fetchData(country);
    this.setState({ data: fetchedData, country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={imageSrc} alt="Header" className={styles.image} />
        <Cards data={data} />

        <CountryPicker handleOnChange={this.handleOnChange}></CountryPicker>
        <Chart data={data} country={country}></Chart>
      </div>
    );
  }
}
export default App;
