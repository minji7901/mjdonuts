import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import All from "./pages/All";
import New from "./pages/New";
import Detail from "./pages/Detail";
import ProtectedRoute from "./pages/ProtectedRoute";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/products",
        element: <All />,
      },
      {
        path: "/product/new",
        element: 
        <ProtectedRoute requireAdmin>
          <New />
        </ProtectedRoute>,
      },
      {
        path: "/product/:id",
        element: <Detail />,
      },
      {
        path: "/carts/",
        element: 
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();