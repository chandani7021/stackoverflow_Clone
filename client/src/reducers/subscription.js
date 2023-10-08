const subscriptionReducer = (state = null, action) => {
    switch (action.type) {
        case "PACK_DETAILS":
            return { ...state, type: action.payload };
        default:
            return state;
    }
};
export default subscriptionReducer;