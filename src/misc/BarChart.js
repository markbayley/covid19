import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";

function BarChart() {
  const initialDates = [
    "2021-08-25",
    "2021-08-26",
    "2021-08-27",
    "2021-08-28",
    "2021-08-29",
    "2021-08-30",
    "2021-08-31",
  ];
  const initialDataPoints = [1, 2, 4, 9, 12, 15, 16];

  const [dates, setDates] = useState(initialDates);
  const [dataPoints, setDataPoints] = useState(initialDataPoints);

  console.log(dates, dataPoints);

  const inputRef1 = useRef("2021-08-25");
  const inputRef2 = useRef();

  function filterData() {
    const dates2 = [...dates];
    const dataPoints2 = [...dataPoints];
    
    //slice the array
    let value1 = inputRef1.current.value;
    let value2 = inputRef2.current.value;
    const indexstartdate = dates2.indexOf(value1);
    const indexenddate = dates2.indexOf(value2);
    console.log(indexstartdate);
    console.log(indexenddate);
    //slice the array
    const filterDate = dates2.slice(indexstartdate, indexenddate + 1);
    const filterDataPoints = dataPoints2.slice(
      indexstartdate,
      indexenddate + 1
    );

    console.log(filterDate, filterDataPoints);

    //replace label in the chart
    //HELP HERE!!!

    setDates(filterDate);
    setDataPoints(filterDataPoints);
    console.log(dates, dataPoints);
  }

  return (
    <div>
      <div>
        <Line
          id="myChart"
          data={{
            labels: dates,

            datasets: [
              {
                label: "Sales",
                data: dataPoints,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <input type="date" ref={inputRef1} />
      <input type="date" ref={inputRef2} />
      <button onClick={filterData}>Filter</button>
    </div>
  );
}

export default BarChart;