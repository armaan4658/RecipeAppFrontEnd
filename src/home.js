import TextField from "@material-ui/core/TextField";
import { Recipe, Filter } from "./recipeComponent";
import React from "react";
export function Home({ recipeArr, setRecipeArr, search, setSearch }) {
  return (
    <div>
      <form noValidate autoComplete="off" className="center">
        <TextField
          id="outlined-basic"
          label="Search for recipes"
          variant="outlined"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          style={{
            color: "white",
            background: "white",
            border: "2px solid black",
            borderRadius: "5px"
          }}
        />
      </form>
      {/* checking if search is true */}
      {search ? (
        // filtered recipe will be shown
        <Filter search={search} recipeArr={recipeArr} />
      ) : (
        // all recipes will be shown
        <Recipe recipeArr={recipeArr} />
      )}
    </div>
  );
}
