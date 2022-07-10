import React, { Component } from "react";
import Loading from "./Loading";
import axios from "axios";
import CountryTable from "./CountryTable";
import Chart from "../components/Chart";
import { Search } from "react-bootstrap-icons";
import CountUp from "react-countup";
import { Row, Col } from "react-bootstrap";

class Covid extends Component {
  state = {
    countries: [],
    filterText: "",
    allCountryTotal: 0,
    allDeathTotal: 0,
    allActiveTotal: 0,
    selectedCountries: [],
  };

  url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

  async componentDidMount() {
    const response = await axios.get(this.url);
    const rows = response.data.split("\n");

    const countries = [];
    let allCountryTotal = 0;
    let allDeathTotal = 0;
    let allActiveTotal = 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); //splitting on ,
      const countryName = row[0].replace(/"/g, "");
      const total = Number(row[4]);
      const deaths = Number(row[5]);
      const active = Number(row[7]);
      if (countryName !== "") {
        countries.push({
          name: countryName,
          total: total,
          deaths: deaths,
          active: active,
        });
        allCountryTotal += total;
        allDeathTotal += deaths;
        allActiveTotal += active;
      }
      console.log(row)
    }

    await new Promise(function (x) {
      setTimeout(x, 1000);
    });

    this.setState({ countries, allCountryTotal, allDeathTotal, allActiveTotal });
  }

  handleOnRowSelected = (countryToUpdate) => {
    const countries = [...this.state.countries];

    const countryIndex = countries.findIndex(
      (c) => c.name === countryToUpdate.name
    );

    const country = {
      name: countryToUpdate.name,
      total: countryToUpdate.total,
      selected: !countryToUpdate.selected,
    };

    countries[countryIndex] = country;

    this.setState({
      countries,
      selectedCountries: countries.filter((c) => c.selected),
    });
  };

  sortByTotal = (countryA, countryB) => {
    // 0 equal
    // 1 greater
    // -1 less
    if (countryB.total > countryA.total) return 1;
    else if (countryB.total < countryA.total) return -1;
    else return 0;
  };

  handleOnSortByTotal = (event) => {
    this.handleOnSortBy(event, this.sortByTotal);
  };

  sortByCountryName = (countryA, countryB) => {
    // 0 equal
    // 1 greater
    // -1 less
    if (countryA.name > countryB.name) return 1;
    else if (countryA.name < countryB.name) return -1;
    else return 0;
  };

  handleOnSortByCountryName = (event) => {
    this.handleOnSortBy(event, this.sortByCountryName);
  };

  handleOnSortBy = (event, sortOperation) => {
    event.preventDefault();
    const countries = [...this.state.countries];
    countries.sort(sortOperation);
    this.setState({ countries });
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleFilterTextChange = (event) => {
    const filterText = event.target.value;
    this.setState({ filterText: filterText });
  };

  render() {
    const {
      countries,
      allDeathTotal,
      allCountryTotal,
      allActiveTotal,
      selectedCountries,
      filterText,
    } = this.state;
    


    return (
      <div
        className="text-info"
        style={{
          position: "absolute",
          width: "90vw",
          marginTop: "25px",
     
        }}
      >
        <Row>
          <Col xl={5}></Col>
          <Col xl={1} style={{border: "1px solid #fff"}}>
            <h5>
              {
                <i style={{ color: "grey" }} className="fa fa-male"></i>
              }{" "}
              Cases
            </h5>
            <h3>
              <CountUp
                start={0}
                end={allCountryTotal}
                duration={36}
                separator=","
              />
            </h3>
          </Col>
          <Col xl={1}>
            <h5>
              {<i style={{ color: "black" }} className="fa fa-male"></i>} Deaths
            </h5>
            <h3>
              <CountUp
                start={0}
                end={allDeathTotal}
                duration={36}
                separator=","
              />
            </h3>
          </Col>
          <Col xl={1}>
            <h5>
              {<i style={{ color: "orange" }} className="fa fa-male"></i>}{" "}
              Active
            </h5>
            <h3>
              <CountUp
                start={0}
                end={allActiveTotal}
                duration={36}
                separator=","
              />
            </h3>
          </Col>
        </Row>

        {allCountryTotal === 0 ? (
          <Loading />
        ) : (
          <div>
           
          </div>
        )}
      </div>
    );
  }
}

export default Covid;
