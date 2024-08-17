import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StoreContextProvider>
			<App />
		</StoreContextProvider>
	</BrowserRouter>
);

