import React from "react";

// My Components
import Details from "./Details";

const GoldPack = ({ checkoutHandler }) => {
  return (
    <div className="pack_box">
      <Details
        headName={"GOLD Pack"}
        price={"1000"}
        details={["Become a Gold User", "Can post unlimited Question", "Expire after 1 month"]}
      />
      <button className="plan_submit" onClick={() => checkoutHandler(1000)}>
        SELECT PLAN
      </button>
    </div>
  );
};

export default GoldPack;