import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
// My Components

import FreePack from "./FreePack";
import SilverPack from "./SilverPack";
import GoldPack from "./GoldPack";
import { paymentCheckout } from "../../actions/payments";

// Styles
import "./subscription_style.css";
import { Helmet } from "react-helmet";

const Subscription = () => {
  const dispatch = useDispatch();
 

  let User = useSelector((state) => state.currentUserReducer);
  const API = useSelector((state) => state.apikeyReducer);
  const { data } = useSelector((state) => state.paymentReducer);


  const checkoutHandler = (amount) => {
    if (User) {
      dispatch(paymentCheckout({ amount }));
      const options = {
        key: API?.key,
        amount: data?.amount,
        currency: "INR",
        name: "Chandani Mourya",
        description: "Overflow Subscription",
        image:
          "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        order_id: data?.id || "",
        callback_url: "https://stackoverflow-server-z13s.onrender.com/payment/verification",
        prefill: {
          name: User?.name,
          email: User?.email,
          contact: "7021405056",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F57105",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      localStorage.setItem("Payment", JSON.stringify({ amount: data.amount }));
    } else {
      alert("Login Required!");
    }
    // If already have subscription then don't allow to buy another one
  };

  return (
    <div className="container">
      <Helmet>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Helmet>
      <div className="header">
        <h1>StackOverflow Question Pack</h1>
        <h4>Pick The Best plan for you to get started with your learning journey</h4>
      </div>
      <div className="Pack_container">
        <FreePack />
        <SilverPack checkoutHandler={checkoutHandler} />
        <GoldPack checkoutHandler={checkoutHandler} />
      </div>
    </div>
  );
};

export default Subscription;