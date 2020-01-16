import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === "development") {
  console.log("NOTE: service worker disabled for development");
  serviceWorker.unregister();
} else {
  serviceWorker.register();
  // https://medium.com/@toricpope/transform-a-react-app-into-a-progressive-web-app-pwa-dea336bd96e6
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("worker.js")
        .then(
          function(registration) {
            console.log("Worker registration successful", registration.scope);
          },
          function(err) {
            console.log("Worker registration failed", err);
          }
        )
        .catch(function(err) {
          console.log(err);
        });
    });
  } else {
    console.log("Service Worker is not supported by browser.");
  }
}
