import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

const DoughnutCases = ({
  casesMillion,
  activeMillion,
  index,
  colorsPie,
  continentCountries,
  colorActive,
  region
}) => {
  // Create strata for Cases
  const cases1 = continentCountries.filter(
    (selectedCountry) => selectedCountry.casesPerOneMillion / 1000 < 50
  );
  // const c1 = data.datasets[item.datasetIndex].data[item.index];
  const cases2 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 50 &&
      selectedCountry.casesPerOneMillion / 1000 < 100
  );
  const cases3 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 100 &&
      selectedCountry.casesPerOneMillion / 1000 < 150
  );
  const cases4 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 150 &&
      selectedCountry.casesPerOneMillion / 1000 < 350
  );
  const cases5 = continentCountries.filter(
    (selectedCountry) => selectedCountry.casesPerOneMillion / 1000 > 350
  );

  // Create Strata for Active
  const active1 = continentCountries.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 < 5
  );
  const active2 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 5 &&
      selectedCountry.activePerOneMillion / 1000 < 10
  );
  const active3 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 10 &&
      selectedCountry.activePerOneMillion / 1000 < 15
  );
  const active4 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 15 &&
      selectedCountry.activePerOneMillion / 1000 < 35
  );
  const active5 = continentCountries.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 > 35
  );

  return (
<>
      <div
        className="pb-5"
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ccc",
        }}
      >
        {activeMillion[index] / 1000 < 5 ? (
          <h6>Mild</h6>
        ) : activeMillion[index] / 1000 < 10 ? (
          <h6 >Limited</h6>
        ) : activeMillion[index] / 1000 < 15 ? (
          <h6>Moderate</h6>
        ) : activeMillion[index] / 1000 < 35 ? (
          <h6>Serious</h6>
        ) : (
          <h6>Extreme</h6>
        )}
      </div>

      {/* <h6 className="py-2 " style={{ color: "#ccc", fontSize: "14px" }}>
       {region} Analysis: {continentCountries.length}
      </h6> */}
   

 
      <div style={{ zIndex: 1 }}>
        <Doughnut
          data={{
            datasets: [
              {
                data: [
                  cases1.length,
                  cases2.length,
                  cases3.length,
                  cases4.length,
                  cases5.length,
                ],
                backgroundColor: colorsPie,
                label: "Cases",
                stack: "0",
              },
              {
                data: [
                  active1.length,
                  active2.length,
                  active3.length,
                  active4.length,
                  active5.length,
                ],
                backgroundColor: ["#ffb300","#ffa400","#ff9400","#ff8300","#ff7200"],
                label: "Active",
                stack: "0",
              },
            ],

            labels: ["Lowest", "Lower", "Average", "Higher", "Highest"],
          }}
          options={{
            elements: {
              arc: {
                // borderWidth: 0.5,
                // borderColor: "turquoise",
                borderColor: "#212529",
                borderWidth: 1,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: false,
              position: "",
            },
            title: {
              display: false,
              text: " "
             
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
      <Row className="px-2 pt-4" >
      <h6 className="pb-0">Countries Grouped by Severity</h6>  
     
                </Row>
    </>
  );
};

export default DoughnutCases;


