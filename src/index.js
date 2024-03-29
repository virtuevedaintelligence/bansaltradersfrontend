import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/productcontext";
import { CategoryProvider } from "./context/categorycontext";
import { ReviewProvider } from "./context/reviewcontext";
import AOS from "aos";
import "aos/dist/aos.css";
import { FilterContextProvider } from "./context/fitercontext";
import { Provider } from "react-redux";
import WarningScreen from "./components/warning/WarningScreen";

AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductProvider>
      <CategoryProvider>
        <ReviewProvider>
          <FilterContextProvider>
            <Provider store={store}>
              <WarningScreen>
                <App />
              </WarningScreen>
            </Provider>
          </FilterContextProvider>
        </ReviewProvider>
      </CategoryProvider>
    </ProductProvider>
  </React.StrictMode>
);
