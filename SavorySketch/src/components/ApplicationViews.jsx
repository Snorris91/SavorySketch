import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { Register } from "../pages/Register.jsx";
import { useEffect, useState } from "react";
import { Cuisines } from "../views/Cuisine.jsx";
import { Ingredients } from "../views/Ingredients.jsx";
import { MyProfile } from "../views/Profile.jsx";
import { Recipe } from "../views/Recipe.jsx";
import { MyRecipe } from "../views/MyRecipe.jsx";
import { AddRecipe } from "../views/AddRecipe.jsx";
import { AddRecipe2 } from "../views/AddRecipe2.jsx";

export const ApplicationViews = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized/>}>
          <Route index element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/myrecipes" element={<MyRecipe />} />
          <Route
            path="/addrecipes"
            element={<AddRecipe/>}
          />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
