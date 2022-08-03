import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Row } from "react-bootstrap";

const DoughnutDeaths = ({
  deathsMillion,
  index,
  colorsPie,
  continentCountries,
}) => {
  // Create Strata for Deaths
  const deaths1 = continentCountries.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 < 0.5
  );
  const deaths2 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 0.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1
  );
  const deaths3 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1.5
  );
  const deaths4 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 3.5
  );
  const deaths5 = continentCountries.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 > 3.5
  );

  // Create Strata for Critical
  const critical1 = continentCountries.filter(
    (selectedCountry) => selectedCountry.criticalPerOneMillion / 1000 < 0.005
  );
  const critical2 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.criticalPerOneMillion / 1000 >= 0.005 &&
      selectedCountry.criticalPerOneMillion / 1000 < 0.01
  );
  const critical3 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.criticalPerOneMillion / 1000 >= 0.01 &&
      selectedCountry.criticalPerOneMillion / 1000 < 0.015
  );
  const critical4 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.criticalPerOneMillion / 1000 >= 0.015 &&
      selectedCountry.criticalPerOneMillion / 1000 < 0.035
  );
  const critical5 = continentCountries.filter(
    (selectedCountry) => selectedCountry.criticalPerOneMillion / 1000 > 0.035
  );

  return (
    <Row
      className={"box mt-2 pb-3"}
      style={{
        color: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="pt-5"
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "grey",
        }}
      >
        {deathsMillion[index] / 1000 < 0.5 ? (
          <h6>Mild</h6>
        ) : deathsMillion[index] / 1000 < 1 ? (
          <h6>Limited</h6>
        ) : deathsMillion[index] / 1000 < 1.5 ? (
          <h6>Moderate</h6>
        ) : deathsMillion[index] / 1000 < 3.5 ? (
          <h6>Serious</h6>
        ) : (
          <h6>Extreme</h6>
        )}
      </div>

      <div className="py-2 " style={{ color: "grey", fontSize: "14px" }}>
        Country Analysis
      </div>
      <div style={{ zIndex: 1 }}>
        <Doughnut
          data={{
            datasets: [
              {
                data: [
                  deaths1.length,
                  deaths2.length,
                  deaths3.length,
                  deaths4.length,
                  deaths5.length,
                ],
                backgroundColor: colorsPie,
                label: "Deaths",
                stack: "0",
              },

              {
                data: [
                  critical1.length,
                  critical2.length,
                  critical3.length,
                  critical4.length,
                  critical5.length,
                ],
                backgroundColor: colorsPie,
                label: "Critical",
                stack: "0",
              },
            ],
            labels: ["Lowest", "Lower", "Average", "Higher", "Highest"],
          }}
          options={{
            elements: {
              arc: {
                borderWidth: 0.5,
                borderColor: "turquoise",
              },
            },
            responsive: true,
            legend: {
              display: false,
              position: "",
            },
            title: {
              display: false,
              text: "",
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
            tooltips: {
              backgroundColor: "#212529",
              borderColor: "turquoise",
              borderWidth: 1,
              cornerRadius: 2,
              displayColors: true,
              bodyFontSize: 12,
              labels: {
                usePointStyle: true,
              },
              callbacks: {
                label: function (item, data) {
                  console.log(data.labels, item);
                  return (
                    data.datasets[item.datasetIndex].label +
                    ": " +
                    data.labels[item.index] +
                    ": " +
                    data.datasets[item.datasetIndex].data[item.index]
                  );
                },
              },
            },
          }}
        ></Doughnut>
      </div>
    </Row>
  );
};

export default DoughnutDeaths;


