
import { createStore } from "redux";
import daysReducer from "./DaysSlice";

const store = createStore(
  daysReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;