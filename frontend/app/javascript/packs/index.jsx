import React from 'react';
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from '../redux/store'

import App from "../components/App";


window.addEventListener("DOMContentLoaded", function (e) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});