import React from "react";
import {createBrowserRouter,RouterProvider,Outlet,} from "react-router"; 
import Home from "../pages/Home";
import Ai from "../pages/Ai";
import Navbar from "../components/shared/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="py-6">
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "assistant", element: <Ai /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
