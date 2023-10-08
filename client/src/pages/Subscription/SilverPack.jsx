import React from "react";

// My Components
import Details from "./Details";

const SilverPack = ({ checkoutHandler }) => {
  return (
    <div className="pack_box">
      <Details
        headName={"SILVER Pack"}
        price={"100"}
        details={["For Custom User", "Can post only 5 Question in a day", "Expire in a month"]}
      />
      <button className="plan_submit" onClick={() => checkoutHandler(100)}>
        SELECT PLAN
      </button>
    </div>
  );
};

export default SilverPack;