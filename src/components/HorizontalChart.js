import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";

import { getElementAtEvent, HorizontalBar } from "react-chartjs-2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.register(ChartDataLabels);

// Chart.defaults.set('plugins.datalabels', {
//   color: '#FE777B'
// });

const HorizontalChart = ({
  props,
  countryNames,
  activePerOneMillion,
  casesPerOneMillion,
  testsPerOneMillion,
  criticalPerOneMillion,
  deathsPerOneMillion,
  recoveredPerOneMillion,
  colorCases,
  colorActivity,
  colorDeaths,
  index,
  mortalityRate,
  continentCountries,
  // continentCountrys,
  // sorted,
  // handleSort,
  // handleSortActive,
  // handleSortTests
}) => {
  // const chartRef = useRef();

  const [continentCountrys, setSampleData] = useState(
    continentCountries.sort((a, b) =>
      a.casesPerOneMillion < b.casesPerOneMillion ? 1 : -1
    )
  );
  const [sorted1, setSorted1] = useState();
  const [sorted2, setSorted2] = useState();
  const [sorted3, setSorted3] = useState();
  const [sorted4, setSorted4] = useState();

  useEffect(() => {
    setSampleData(continentCountrys);
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
  // console.log(deathsPerOneMillion[index], 'deathsPerOneMillion')
  // const deaths = deathsPerOneMillion.sort((a, b) => (a.deathsPerOneMillion < b.deathsPerOneMillion ? 1 : -1))

  const countryName = continentCountrys.map(
    (selectedCountry) => selectedCountry.country
  );

  // console.log(countryName, continentCountrys, "countryName");

  const casesPerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.casesPerOneMillion / 1000).toFixed(1)
  );

  const testsPerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.testsPerOneMillion / 1000).toFixed(0)
  );

  const activePerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.activePerOneMillion / 1000).toFixed(2)
  );

  const deathsPerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.deathsPerOneMillion / 1000).toFixed(3)
  );

  const recoveredPerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.recoveredPerOneMillion / 1000).toFixed(0)
  );

  const criticalPerMil = continentCountrys.map((selectedCountry) =>
    (selectedCountry.criticalPerOneMillion / 1000).toFixed(3)
  );

  const colorCasez = [];
  for (let i = 0; i < casesPerMil.length; i++) {
    if (casesPerMil[i] < 50) {
      colorCasez.push("#885dfc");
    }
    if (casesPerMil[i] >= 50 && casesPerMil[i] < 100) {
      colorCasez.push("#a13ed5");
    }
    if (casesPerMil[i] >= 100 && casesPerMil[i] < 150) {
      colorCasez.push("#ca32ad");
    }
    if (casesPerMil[i] >= 150 && casesPerMil[i] < 350) {
      colorCasez.push("#e72585");
    }
    if (casesPerMil[i] >= 350) {
      colorCasez.push("#ff125e");
    }
  }

  const max = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.casesPerOneMillion)
  );

  // console.log(max, "MAX");

  const maxName = continentCountries
    .filter(
      (country) =>
        // country.continent === region &&
        // country.country.length <= 12 &&
        country.casesPerOneMillion === max
    )
    .map((selectedCountry) => selectedCountry.country);

  const colorActiv = [];
  for (let i = 0; i < activePerMil.length; i++) {
    if (activePerMil[i] < 5) {
      colorActiv.push("#ffb300");
    }
    if (activePerMil[i] >= 5 && activePerMil[i] < 10) {
      colorActiv.push("#ffa400");
    }
    if (activePerMil[i] >= 10 && activePerMil[i] < 15) {
      colorActiv.push("#ff9400");
    }
    if (activePerMil[i] >= 15 && activePerMil[i] < 35) {
      colorActiv.push("#ff8300");
    }
    if (activePerMil[i] >= 35) {
      colorActiv.push("#ff7200");
    }
  }
 
  // const onClick = (event) => {
  //   const elem = getElementAtEvent(chartRef.current, event);
  //   props.onHandleBarClickEvent(elem[0].index, elem[0].datasetIndex);
  // };

  return (
    <Row
      className={"box"}
      style={{
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="">
        <strong style={{ color: "", fontSize: "14px" }} className="pt-1 ">
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-1 mt-0"
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
            className="sort p-1 mt-0 mx-0"
            onClick={handleSort}
            style={{ color: "#fff" }}
            // style={{ color: "", borderColor: "#e72585"}}
          >
            {sorted2 ? (
              <i className="fa fa-arrow-up icon"></i>
            ) : (
              <i className="fa fa-arrow-down icon"></i>
            )}
            &nbsp;Cases
          </Button>
          {/* <span >&nbsp;Tests</span> */}
          {/* <Button
            size="sm"
            variant="outline-dark"
            className="sort mt-0"
            onClick={handleSortTests}
            style={{ color: "#fff" }}
            // style={{color: "", borderColor: "turquoise"}}
          >
            {sorted3 ? (
              <i className="fa fa-arrow-down"></i>
            ) : (
              <i className="fa fa-arrow-up"></i>
            )}
            &nbsp;Tests
          </Button> */}
          <Button
            size="sm"
            variant="outline-dark"
            className="sort p-1 mt-0"
            onClick={handleSortDeaths}
            style={{ color: "#fff" }}
            // style={{color: "", borderColor: "turquoise"}}
          >
            {sorted4 ? (
              <i className="fa fa-arrow-down"></i>
            ) : (
              <i className="fa fa-arrow-up"></i>
            )}
            &nbsp;Death
          </Button>
        </strong>
      </Row>

      {/* <Row className="box subtitle px-4 pb-1 pt-2 mt-2">
                <a id={maxName}>
                  {maxName}&nbsp;
                  {numberWithCommas((max / 1000).toFixed(1))} &nbsp;
                  <h6 >
                    Most Cases/1k &nbsp;
                  </h6>
                </a>
              </Row> */}
      {/* <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxActiveName}&nbsp;
                {numberWithCommas((maxActive / 1000).toFixed(1))} &nbsp;
                <h6 style={{ color: colorActive[index] }}>
                  Most Active/1k &nbsp;
                </h6>
              </Row>
              <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxTestsName}&nbsp;
                {numberWithCommas((maxTests / 1000).toFixed(0))} &nbsp;
                <h6 style={{ color: "teal" }}>Most Tests/1k &nbsp;</h6>
              </Row> */}

      <HorizontalBar
        // options={options}
        // onClick={onClick}
        // ref={chartRef}
        data={{
          labels: countryName,
          type: "bar",

          datasets: [
            // {

            //   datalabels: {
            //   listeners: {
            //     click: function(context, event) {
            //       // Receives `click` events only for labels of the first dataset.
            //       // The clicked label index is available in `context.dataIndex`.
            //       console.log('label ' + context.dataIndex + ' has been clicked!');
            //       console.log('mouse is at position x:', event.x, 'and y:', event.y);

            //       if (event.native.ctrlKey) {
            //         console.log('control key is pressed!');
            //       }
            //     }
            //   }
            // }

            // },

            {
              label: "Deaths",
              data: deathsPerMil,
              backgroundColor: "#646464",
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            // {
            //   label: "Critical",
            //   data: criticalPerMil,
            //   backgroundColor: "#d61e73",
            //   borderColor: "#212529",
            //   borderWidth: 1,
            //   stack: "0",
            // },
            {
              label: "Active",
              data: activePerMil,
              backgroundColor: colorActiv,
              // "rgba(255,100,10,0.99)",

              //   backgroundColor: "#d61e73",
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            {
              label: "Cases",
              data: casesPerMil,
              backgroundColor: colorCasez,
              borderColor: "#212529",
              borderWidth: 1,
              stack: "0",
            },
            // {
            //   label: "Recov'd",
            //   data: recoveredPerMil,
            //   backgroundColor: "green",
            //   borderColor: "#212529",
            //   borderWidth: 1,
            //   stack: "0",
            // },

            // {
            //   label: "Tests",
            //   data: testsPerMil,
            //   backgroundColor: "teal",
            //   borderColor: "#212529",
            //   borderWidth: 1,
            //   stack: "0",
            // },
            // {
            //   label: "Mortality",
            //   data: mortalityRate,
            //   backgroundColor: "#d61e73",
            //   borderColor: "#212529",
            //   borderWidth: 1,
            //   stack: "0",
            // },
          ],
        }}
        height={countryNames.length * 40}
        options={{
          onClick: function (evt, element) {
            if (element.length > 0) {
              const id = element[0]._model.label;
              console.log(element, id);
              // you can also get dataset of your selected element
              // console.log(data.datasets[element[0]._datasetIndex])
              return (
                <Row className="subtitle box">
                  <div id={id}>{id}hiiiiiiiii</div>
                </Row>
              );
            }
          },

          // plugins: {
          //   datalabels: {
          //     listeners: {
          //       enter: function(context, event) {
          //         // Receives `enter` events for any labels of any dataset. Indices of the
          //         // clicked label are: `context.datasetIndex` and `context.dataIndex`.
          //         // For example, we can modify keep track of the hovered state and
          //         // return `true` to update the label and re-render the chart.
          //         context.hovered = true;
          //         return true;
          //       },
          //       leave: function(context, event) {
          //         // Receives `leave` events for any labels of any dataset.
          //         context.hovered = false;
          //         return true;
          //       }
          //     },
          //     color: function(context) {
          //       // Change the label text color based on our new `hovered` context value.
          //       return context.hovered ? "blue" : "gray";
          //     }
          //   }
          // },

          tooltips: {
            // callbacks: {
            //   label: function (item, data) {
            //     // console.log( data.labels[item.index]);
            //     const id = item.label;
            //     console.log(id);
            //     return (
            //       data.datasets[item.datasetIndex].label +
            //       ": " +
            //       data.labels[item.index] +
            //       ": " +
            //       data.datasets[item.datasetIndex].data[item.index]
            //     );
            //   },
            // },
            // position: 'nearest',
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
              padding: 5,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 10,
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
          },
        }}
      />

      {/* {countryNames.length < 15 && (
          <>
            <div
              style={{ color: "grey", fontSize: "14px" }}
              className="pt-2 pb-3"
            >
              Active Cases
            </div>
            <div className="pt-2 pb-2"></div>
            <HorizontalBar
              height={countryNames.length * 50}
              options={{
                maintainAspectRatio: true,
                legend: {
                  display: false,
                  position: "",
                },
                layout: {
                  padding: {
                    left: 20,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  },
                },
              }}
              data={{
                labels: countryNames,
                datasets: [
                  {
                    label: "Active/1000",
                    data: activePerOneMillion,
                    backgroundColor: colorActive,
                  },
                ],
              }}
            />
          </>
        )} */}
    </Row>
  );
};

export default HorizontalChart;
