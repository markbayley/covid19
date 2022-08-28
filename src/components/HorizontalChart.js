import { useState, useEffect } from "react";
import React from "react";
import { Row, Button } from "react-bootstrap";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalChart = ({ countryNames, continentCountries }) => {
  const [continentCountriesSorted, setSampleData] = useState(
    continentCountries.sort((a, b) =>
      a.casesPerOneMillion < b.casesPerOneMillion ? 1 : -1
    )
  );
  const [sorted1, setSorted1] = useState();
  const [sorted2, setSorted2] = useState();
  const [sorted3, setSorted3] = useState();
  const [sorted4, setSorted4] = useState();

  useEffect(() => {
    setSampleData(continentCountriesSorted);
    setSorted1(!sorted1);
    setSorted2(!sorted2);
    setSorted3(!sorted3);
    setSorted4(!sorted4);
  }, []);

  function handleSortActive() {
    const sortedData = sorted1
      ? [...continentCountries].sort((a, b) => {
          return a.activePerOneMillion < b.activePerOneMillion ? 1 : -1;
        })
      : [...continentCountries].sort((a, b) => {
          return a.activePerOneMillion > b.activePerOneMillion ? 1 : -1;
        });

    setSampleData(sortedData);
    setSorted1(!sorted1);
  }

  function handleSort() {
    const sortedData = sorted2
      ? [...continentCountries].sort((a, b) => {
          return a.casesPerOneMillion > b.casesPerOneMillion ? 1 : -1;
        })
      : [...continentCountries].sort((a, b) => {
          return a.casesPerOneMillion < b.casesPerOneMillion ? 1 : -1;
        });

    setSampleData(sortedData);
    setSorted2(!sorted2);
  }

  function handleSortTests() {
    const sortedData = sorted3
      ? [...continentCountries].sort((a, b) => {
          return a.testsPerOneMillion < b.testsPerOneMillion ? 1 : -1;
        })
      : [...continentCountries].sort((a, b) => {
          return a.testsPerOneMillion > b.testsPerOneMillion ? 1 : -1;
        });

    setSampleData(sortedData);
    setSorted3(!sorted3);
  }

  function handleSortDeaths() {
    const sortedData = sorted4
      ? [...continentCountries].sort((a, b) => {
          return a.deathsPerOneMillion < b.deathsPerOneMillion ? 1 : -1;
        })
      : [...continentCountries].sort((a, b) => {
          return a.deathsPerOneMillion > b.deathsPerOneMillion ? 1 : -1;
        });

    setSampleData(sortedData);
    setSorted4(!sorted4);
  }

  const countryNamesSort = continentCountriesSorted.map(
    (selectedCountry) => selectedCountry.country
  );


 

  const casesPerMillionSorted = continentCountriesSorted.map(
    (selectedCountry) => (selectedCountry.casesPerOneMillion / 1000).toFixed(1)
  );

  const testsPerMillionSorted = continentCountriesSorted.map(
    (selectedCountry) => (selectedCountry.testsPerOneMillion / 1000).toFixed(0)
  );

  const activePerMillionSorted = continentCountriesSorted.map(
    (selectedCountry) => (selectedCountry.activePerOneMillion / 1000).toFixed(2)
  );

  const deathsPerMillionSorted = continentCountriesSorted.map(
    (selectedCountry) => (selectedCountry.deathsPerOneMillion / 1000).toFixed(3)
  );

  const colorCases = [];
  for (let i = 0; i < casesPerMillionSorted.length; i++) {
    if (casesPerMillionSorted[i] < 50) {
      colorCases.push("#885dfc");
    }
    if (casesPerMillionSorted[i] >= 50 && casesPerMillionSorted[i] < 100) {
      colorCases.push("#a13ed5");
    }
    if (casesPerMillionSorted[i] >= 100 && casesPerMillionSorted[i] < 150) {
      colorCases.push("#ca32ad");
    }
    if (casesPerMillionSorted[i] >= 150 && casesPerMillionSorted[i] < 350) {
      colorCases.push("#e72585");
    }
    if (casesPerMillionSorted[i] >= 350) {
      colorCases.push("#ff125e");
    }
  }

  const colorActiv = [];
  for (let i = 0; i < activePerMillionSorted.length; i++) {
    if (activePerMillionSorted[i] < 5) {
      colorActiv.push("#ffb300");
    }
    if (activePerMillionSorted[i] >= 5 && activePerMillionSorted[i] < 10) {
      colorActiv.push("#ffa400");
    }
    if (activePerMillionSorted[i] >= 10 && activePerMillionSorted[i] < 15) {
      colorActiv.push("#ff9400");
    }
    if (activePerMillionSorted[i] >= 15 && activePerMillionSorted[i] < 35) {
      colorActiv.push("#ff8300");
    }
    if (activePerMillionSorted[i] >= 35) {
      colorActiv.push("#ff7200");
    }
  }

  return (
    <Row
      className={""}
      style={{
        color: "#fff",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Row className="">
        <strong style={{ color: "", fontSize: "14px" }} className="pt-1 ">
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-0 mx-1"
            onClick={handleSortDeaths}
            style={{ color: "#fff" }}
          >
            {sorted4 ? (
              <i className="fa fa-arrow-down"></i>
            ) : (
              <i className="fa fa-arrow-up"></i>
            )}
            &nbsp;Deaths
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-1 mx-1"
            onClick={handleSortActive}
            style={{ color: "#fff" }}
          >
            {sorted1 ? (
              <i className="fa fa-arrow-down"></i>
            ) : (
              <i className="fa fa-arrow-up"></i>
            )}
            &nbsp;Active
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-1 mx-1"
            onClick={handleSort}
            style={{ color: "#fff" }}
          >
            {sorted2 ? (
              <i className="fa fa-arrow-up icon"></i>
            ) : (
              <i className="fa fa-arrow-down icon"></i>
            )}
            &nbsp;Cases
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-1 mx-1"
            onClick={handleSortTests}
            style={{ color: "#fff" }}
          >
            {sorted3 ? (
              <i className="fa fa-arrow-down"></i>
            ) : (
              <i className="fa fa-arrow-up"></i>
            )}
            &nbsp;Tests
          </Button>
        </strong>
      </Row>
      <HorizontalBar
        data={{
          labels: countryNamesSort ,
          type: "bar",
          datasets: [
            {
              label: "Deaths",
              data: deathsPerMillionSorted,
              backgroundColor: "#646464",
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            {
              label: "Active",
              data: activePerMillionSorted,
              backgroundColor: colorActiv,
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            {
              label: "Cases",
              data: casesPerMillionSorted,
              backgroundColor: colorCases,
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            {
              label: "Tests",
              data: testsPerMillionSorted,
              backgroundColor: "teal",
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
          ],
        }}
        height={countryNames.length * 25}
        options={{
         
          tooltips: {
            yPadding: 10,
            xPadding: 10,
            xAlign: "right",
            cornerRadius: 2,
            backgroundColor: "#212529",
            borderColor: "turquoise",
            borderWidth: 1,
            displayColors: true,
            bodyFontSize: 12,
            labels: {
              usePointStyle: true,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          hover: {
            mode: "index",
            intersect: false,
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              fontSize: 10,
              fontColor: "#fff",
              padding: 15,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 5,
              top: 0,
              bottom: 0,
            },
          },
          scales: {
            xAxes: [
              {
                display: false,
                type: "logarithmic",
              },
            ],
          //   yAxes: [{
          //     ticks: {
          //         callback: function(value) { 
          //              return value + ' <a href="https://www.w3schools.com/">(Show me)</a> '
          //         }
          //     },
          //            onClick: function(e) {
          //             return e + ' <a href="https://www.w3schools.com/">(Show me)</a> '

         
          // },
            
          // }]
          },
        }}
      />
    </Row>
  );
};

export default HorizontalChart;
