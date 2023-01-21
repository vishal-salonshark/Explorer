import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Transactions from './comp/transaction'
import TransactionsDetails from './comp/txDetails'
import NavBar from './comp/Navbar'
import BlockDetails from './comp/BlockDetails'
import reportWebVitals from "./reportWebVitals";
import UserTxHistory from './comp/UserTxHistory'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/block/:number",
    element: <BlockDetails />,
  },
  {
    path: "/tarnsactions/:number",
    element: <Transactions />,
  },
  {
    path: "/tx/:transactions",
    element: <TransactionsDetails/>,
  },
  {
    path: "/user/",
    element: <UserTxHistory/>,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();