import React from "react";

// styles
import "./details_style.css";
const Details = ({ headName, price, details }) => {
  return (
    <div className="details_container">
      <div className="price_details">
        <h3 className="pack_tag">{headName}</h3>
        <h1 className="price_tag">
          {price} <h4>{price === "Free" ? "" : "/ Month"}</h4>
        </h1>
      </div>
      <hr />

      <div className="pack_details">
        {details.map((detail, index) => (
          <div className="details_line" key={index}>
            <i className="ri-bard-fill icon_tag"></i>
            <p>{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;