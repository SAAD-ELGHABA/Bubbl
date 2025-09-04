import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const initialState = {};
const middleware = [thunk]

export const store = legacy_createStore(
  rootReducer,
  initialState,
    applyMiddleware(...middleware)
);
