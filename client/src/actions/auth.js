//actions are used in redux to provide update and modify data to the store.

import * as api from '../api'
import { setCurrentUser } from './currentUser.js'

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: "AUTH", data }); //This will go to reducer auth
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/");
    } catch (error) {
        console.log(error)
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({ type: "AUTH", data }) //This will go to reducer auth
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/");
    } catch (error) {
        console.log(error)
    }
}

