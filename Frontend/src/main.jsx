import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import FlashMsgContext from "./context/FlashContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FlashMsgContext>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </FlashMsgContext>
);
