import handleCart from "./handleCart";
import handleFav from "./handleFav";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    handleFav,
})



export default rootReducers;