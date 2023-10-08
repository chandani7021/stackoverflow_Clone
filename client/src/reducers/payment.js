const paymentReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "ORDER_CHECKOUT":
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
export default paymentReducer;