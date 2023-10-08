import React from "react";
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Subscription from "./Subscription";

const SubscriptionPage = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <Subscription />
      </div>
    </div>
  );
};

export default SubscriptionPage;