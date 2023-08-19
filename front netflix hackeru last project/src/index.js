import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/global1.css"
import "./css/global2.css"
import "./css/global3.css"
import "./css/landing.css"
import "./css/login-out.css"
import "./css/mylist.css"
import "./css/navbar1.css"
import "./css/navbar2.css"
import "./css/addnew.css"
import "./css/play.css"
import "./css/user.css"
import "./css/viewtrailer.css"
import "./css/notFound.css"
import "./css/mainview.css"
import "./css/footer.css"
import "./css/dashboard.css"


import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./css/notFound.css";
import App from "./components/app";
ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
