import * as api from "../api/index";

export const setSubscription = (amount, navigate) => async (dispatch) => {
    try {
        const { data } = await api.subscriptionSet(amount);
        navigate("/");
        return dispatch({ type: "PACK_DETAILS", payload: data.type });
    } catch (error) {
        console.log(error);
    }
};

export const subscriptionValidationCheck = (userId) => async () => {
    try {
        await api.subscriptionValidation(userId);
    } catch (error) {
        console.log(error);
    }
};