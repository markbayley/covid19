import React from "react";

const Tooltip = ({ country, location }) => {
//   const { id } = feature.properties;

  return (
    <div id={country}>
      <strong>Source Layer:</strong> {country}
      <br />

    </div>
  );
};

export default Tooltip;
