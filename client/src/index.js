import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ordertable from "./components/Ordertable";
import Orderitems from "./components/Orderitems";
import reportWebVitals from "./reportWebVitals";
import OrderForm from "./components/Orderform";
import WorkOrder from "./components/WorkOrder";
import Home from "./components/Users/Registration";
import Login from "./components/Users/SignIn";
import Errror from "./components/Error";
import ProtectedRoute from "./Header/protectedroute";
import UpdateOrder from './components/updateorder';
import OrderUpdate from './components/OrderUpdate';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/orderform"
          element={
            <ProtectedRoute>
              <OrderForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderUpdate/:id"
          element={
            <ProtectedRoute>
              <OrderUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordertable"
          element={
            <ProtectedRoute>
              <Ordertable />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/orderitems"
          element={
            <ProtectedRoute>
              <Orderitems />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/workorder"
          element={
            <ProtectedRoute>
              <WorkOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Errror />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
