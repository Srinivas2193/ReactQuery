import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
  BrowserRouter,
} from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataEdit } from "./Components/DataEdit";
import { DataSignup } from "./Components/DataSignup";
import { ViewData } from "./Components/ViewData";
import { UserDetails } from "./Components/UserDetails";
import ProductServices from "./Components/NestedRoutes/ProductServices";
import Home from "./Components/Home";
import Community from "./Components/Community";
import Blog from "./Components/Blog";
import RootLayout from "./Components/RootLayout";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/user-details/view/:idno" element={<ViewData />} />
          <Route path="/user-details/edit/:idno" element={<DataEdit />} />

          <Route path="/data-signup" element={<DataSignup />} />
          <Route path="/product-services/*" element={<ProductServices />} />
          <Route path="/community" element={<Community />} />
          <Route path="/Blog" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
