import "./styles.css";
import { useEffect, useState } from "react";
import { Home } from "./home";
import React from "react";
import { RecipePage } from "./recipepage";
import { AddRecipe } from "./addRecipe";
import { Logo } from "./logo";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { Switch, Route, Link } from "react-router-dom";
function App() {
  const [search, setSearch] = useState();
  const [recipeArr, setRecipeArr] = useState([]);
  const getData = () => {
    fetch("https://recipe-app-back-end-ak.herokuapp.com/recipes", {
      method: "GET",
      header:{
        "User-Agent":"https://recipe-app-front-end.netlify.app/"
      }
    })
      .then((res) => res.json())
      .then((res) => setRecipeArr(res));
  };
  useEffect(getData, []);
  console.log(recipeArr);
  return (
    <div className="App">
      <nav>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/"> Home </Link>
          <Link to="/add-recipe"> Add Recipe </Link>
          <Link to="/about"> About Us </Link>
        </Breadcrumbs>
       
          {" "}
          <Logo />{" "}
       
      </nav>
      <Switch>
        <Route exact path="/">
          <Home
            recipeArr={recipeArr}
            setRecipeArr={setRecipeArr}
            search={search}
            setSearch={setSearch}
          />
        </Route>
        <Route path="/add-recipe">
          <AddRecipe getData={getData} />
        </Route>
        <Route path="/recipe/:id/:recipeName">
          <RecipePage 
          recipeArr={recipeArr} 
          getData={getData} />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
