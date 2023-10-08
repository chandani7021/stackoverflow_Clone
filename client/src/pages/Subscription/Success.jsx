import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubscription } from "../../actions/subscription";
import { setCurrentUser } from "../../actions/currentUser";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pay = JSON.parse(localStorage.getItem("Payment")).amount;
  // let User = useSelector((state) => state.currentUserReducer);
  const User = JSON.parse(localStorage.getItem("Profile"));
  const id = User.result._id;

  const onGoBack = (e) => {
    e.preventDefault();
    const amount = pay / 100;
    dispatch(setSubscription({ amount, id }, navigate));
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "9rem",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
        }}
      >
        Payment Successful
      </h1>
      <h2>Kindly Log In Again For Active Your Plan</h2>
      <h3>Thank you for using us. Have a Good journey</h3>
      <button
        onClick={onGoBack}
        style={{
          padding: "1px 1rem",
          marginTop: "2rem",
          borderRadius: "5px",
          fontWeight: 600,
          boxShadow: "0px 3px 10px 0px #1a1816c2, inset 0 0 5px 2px #975500cf",
          fontSize: "2rem",
          background: " #ff780099",
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default Success;