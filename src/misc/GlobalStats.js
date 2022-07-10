import React, { useState, useEffect } from "react";
// import Card from "./Card";
import Card from './Card'
import { GLOBAL_URL } from "../api/api";

const GlobalStats = (props) => {
  const [globalStats, setGlobalStats] = useState({});

  useEffect(() => {
    async function fetchGlobalSummary() {
      try {
        const result = await fetch(GLOBAL_URL);
        const globalStats = await result.json();
        setGlobalStats({ ...globalStats });
        props.updated(globalStats["updated"]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGlobalSummary();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "120px",
        width: "100vw",
        position: "absolute",
      }}
    >
      <Card title={"confirmed"} value={globalStats.cases}></Card>

      <Card title={"deaths"} value={globalStats.deaths}></Card>

      <Card title={"recovered"} value={globalStats.recovered}></Card>
     
    </div>
  );
};

export default GlobalStats;
