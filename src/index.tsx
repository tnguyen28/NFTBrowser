import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import {
  applyMiddleware,
  configureStore,
  createImmutableStateInvariantMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { reducer } from "./store/actionReducer";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const immutableStateInvariant = createImmutableStateInvariantMiddleware();

//TODO type state, action, dispatch
const store = configureStore({
  reducer: reducer,
});
export type AppDispatch = typeof store.dispatch;
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
