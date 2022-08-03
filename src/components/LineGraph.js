import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";



const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=180")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  console.log(data[178], 'DATA178')

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          width={320}
          height={130}
        //   options={options}

        options={{
            legend: {
              display: false,
              position: "bottom",
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  // stacked: true,
                //   type: "logarithmic",
                  display: false,
                },
              ],
              xAxes: [
                {
                  // display: false,
                },
              ],
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
            },
          }}
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                // data: data,
                data: [data[30], data[60], data[90], data[120], data[150], data[178]],
              
              },
            ],
          }}
        />
      )}
    </div>
  );
}



export default LineGraph;
