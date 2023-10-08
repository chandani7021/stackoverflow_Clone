import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from './currentUser'
import questionsReducer from './Question.js'
import usersReducer from "./users.js";
// import verifyReducer from "./verify";
import paymentReducer from "./payment";
import apikeyReducer from "./apiKey";
import subscriptionReducer from "./subscription";

export default combineReducers({
    authReducer,
    currentUserReducer,
    questionsReducer,
    usersReducer,
    paymentReducer,
    apikeyReducer,
    subscriptionReducer,
})