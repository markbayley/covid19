import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import { Row } from 'react-bootstrap';


import {  


  getElementAtEvent,
  HorizontalBar,
 
} from 'react-chartjs-2';





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
}) => {

  const chartRef = useRef();


  


  

  const data = {
    labels: countryNames,
    datasets: [
      // {
      //   label: "Active",
      //   data: activePerOneMillion,
      //   backgroundColor: colorActivity,
      // //   backgroundColor: "#d61e73",
      // borderColor: "#212529",
      // borderWidth: 1,
      //   stack: "0",
      // },
      {
        label: "Cases",
        data: casesPerOneMillion,
        backgroundColor: colorCases,
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },

      {
        label: "Tests",
        data: testsPerOneMillion,
        backgroundColor: "teal",
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },
      {
        label: "Critical",
        data: criticalPerOneMillion,
        backgroundColor: "#d61e73",
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },
      {
        label: "Deaths",
        data: deathsPerOneMillion,
        backgroundColor: colorDeaths,
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },

      {
        label: "Recovered",
        data: recoveredPerOneMillion,
        backgroundColor: "teal",
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },
      {
        label: "Mortality",
        data: mortalityRate,
        backgroundColor: "#d61e73",
        borderColor: "#212529",
        borderWidth: 1,
        stack: "0",
      },
    ],
  }

  const onClick = (event) => {
    const elem = getElementAtEvent(chartRef.current, event)
    props.onHandleBarClickEvent(elem[0].index, elem[0].datasetIndex)    
  }

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
      <strong style={{ color: "#ccc", fontSize: "14px" }} className="pt-2">
        By Country / 1k
      </strong>
    
      <HorizontalBar
        // options={options} 
        onClick={onClick}  
        ref={chartRef}
        data={data}
     
        height={countryNames.length * 40}
        options={{
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
            display: false,
            position: "bottom",
            labels: {
              usePointStyle: true,
              fontSize: 12,
              fontColor: "#fff",
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
