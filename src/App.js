import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Components/Recipe/Recipe';

const App = () => {
  const App_id = "1269480c";
  const App_keys = "dd522602865e1ed54efb3a838fe135b7";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_keys}`
      );
      const data = await response.json();
      
      setRecipes(data.hits);
      
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    // console.log(search);  
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <h1 className ="header">Recipe Info</h1>
      <form onSubmit = {getSearch} className="search-form">
        <input className = "search-input"type="text" value = {search} onChange={updateSearch}></input>
        <button className="search-button">Search</button>
      </form>
      <div className = "recipes">
      {
        recipes.map(recipe => (<Recipe
        key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />))
      }
      </div>
    </div>
  );
}

export default App;
