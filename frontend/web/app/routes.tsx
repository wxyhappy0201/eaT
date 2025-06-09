import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  }
]);

export default router; 