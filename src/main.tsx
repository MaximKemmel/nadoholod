import { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./store/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
