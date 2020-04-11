import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import dataReducer from "./dataReducer";
export default combineReducers({
  auth: authReducer,
  data : dataReducer,
  errors: errorReducer
});
