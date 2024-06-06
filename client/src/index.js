import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import * as serviceWorkerRegistration from './ServiceWorkerRegistration.js';

const container = document.getElementById("root");
const root = createRoot(container);
serviceWorkerRegistration.register();

// if ('serviceWorker' in navigator) {
//   console.log('aaaaa')
//   console.log(navigator.serviceWorker.ready)
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(registration => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch(error => {
//       console.error('Service Worker registration failed:', error);
//     });
//     console.log('service-worker reigistered in index.js')
// } else {
//   console.log('no service worker on client')
// }



root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <ErrorBoundary FallbackComponent={ErrorPage}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ErrorBoundary>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

