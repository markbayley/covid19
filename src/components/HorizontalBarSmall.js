import React from "react";
import { Row } from "react-bootstrap";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalBarSmall = ({
  colorActive,
  colorCase,
  casesMillion,
  activeMillion,
  testsMillion,
  colorDeath,
  deathsMillion,
  criticalMillion,
  recoveredMillion,
  index,
  region,
}) => {
  return (
    <Row
      style={{
        color: "#ccc",
        border: "1px solid",
        borderColor: "#2a3d3d",
        borderRadius: "5px",
        paddingLeft: "10px",
        paddingBottom: "10px"
      }}
    >
      <HorizontalBar
        height={15}
        width={100}
        options={{
          tooltips: {
            yPadding: 10,
            xPadding: 10,
            xAlign: "left",
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
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
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
        data={{
        //   labels: region,
          datasets: [
            {
              label: "Active",
              // backgroundColor: "#d61e73",
              backgroundColor: colorActive,
            //   borderColor: "turquoise",
            //   borderWidth: 1,
              data: activeMillion,
              stack: "0",
            },

            {
              label: "Cases",
              backgroundColor: colorCase,
            //   borderColor: "turquoise",
            //   borderWidth: 1,
              data: casesMillion,
              stack: "0",
            },
            {
              label: "Tests",
              backgroundColor: "teal",
            //   borderColor: "turquoise",
            //   borderWidth: 1,
              data: testsMillion,
              stack: "0",
            },
            {
                label: "Critical",
                backgroundColor: "#d61e73",
                // borderColor: "turquoise",
                // borderWidth: 1,
                data: criticalMillion,
                stack: "0",
              },

              {
                label: "Deaths",
                backgroundColor: colorDeath,
                // borderColor: "turquoise",
                // borderWidth: 1,
                data: deathsMillion ,
                stack: "0",
              },
              {
                label: "Recovered",
                backgroundColor: "teal",
                // borderColor: "turquoise",
                // borderWidth: .1,
                data: recoveredMillion,
                stack: "0",
              },
          ],
        }}
      />
    </Row>
  );
};

export default HorizontalBarSmall;
