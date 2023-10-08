import React from "react";

// My Components
import Details from "./Details";

const FreePack = () => {
  return (
    <div className="pack_box">
      <Details
        headName={"FREE Pack"}
        price={"Free"}
        details={["Default for All User", "Can post only 1 Question per Day", "Never Expire"]}
      />
      <button className="plan_submit"> SELECT PLAN</button>
    </div>
  );
};

export default FreePack;