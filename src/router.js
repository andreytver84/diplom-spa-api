import { Navigate, createBrowserRouter } from "react-router-dom";
import React from "react";
import Hall from "./views/client/Hall";
import NotFound from "./views/NotFound";
import Login from "./views/admin/Login";
import AdminPanel from "./views/admin/AdminPanel";
import DefaultLayout from "./components/DefaultLayout";
import AdminLayout from "./components/AdminLayout";
import Payment from "./views/client/Payment";
import Home from "./views/client/Home";
import Ticket from "./views/client/Ticket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/hall/:sessionId",
        element: <Hall />,
      },
      {
        path: "/payment/:uniqueCode",
        element: <Payment />,
      },
      {
        path: "/ticket/:uniqueCode",
        element: <Ticket />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/adminpanel",
        element: <AdminPanel />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
