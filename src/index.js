import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

//
import "./styles/index.scss";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";

//
import { Provider } from "react-redux";
import { persistor, store} from './app/store'
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
