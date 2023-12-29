import { useEffect, useState } from "react";
import { fetchAllRecipesFromAPI } from "../services/RecipeService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";
import {useNavigate } from "react-router-dom";

export const Recipe = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [allCuisines, setAllCuisines] = useState([]);
  const [chosenCuisine, setChosenCuisine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchAndSetAllRecipes = () => {
    fetchAllRecipesFromAPI().then((recipeArray) => {
      setAllRecipes(recipeArray);
    });
  };
  const fetchAndSetAllCuisines = () => {
    fetchAllCuisineFromAPI().then((cuisineArray) => {
      setAllCuisines(cuisineArray);
    });
  };

  useEffect(() => {
    fetchAndSetAllRecipes();
    fetchAndSetAllCuisines();
  }, []);

  useEffect(() => {
    if (chosenCuisine > 0) {
      const recipeCuisine = allRecipes.filter(
        (recipe) => recipe.cuisine.id === parseInt(chosenCuisine)
      );
      setFilteredRecipes(recipeCuisine);
    } else {
      setFilteredRecipes(allRecipes);
    }
  }, [chosenCuisine, allRecipes]);

  useEffect(() => {
    const foundRecipe = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(foundRecipe);
  }, [searchTerm, allRecipes]);

  return (
    <>
      <div>
        <header className="page-header flex justify-evenly">
          <div className="drop-down-box">
            <select
              onChange={(event) => {
                setChosenCuisine(event.target.value);
              }}
              type="filter"
              className="filter p-2"
            >
              <option value="0">Select Cuisine</option>
              {allCuisines.map((cuisine) => {
                return (
                  <option value={cuisine.id} key={cuisine.id}>
                    {cuisine.name}
                  </option>
                );
              })}
            </select>
          </div>
          <h1 className="title font-bold text-3xl text-white">All recipes</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Here"
              className="search-field p-2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </header>
        <div className="recipes m-5 grid lg:grid-cols-3 sm:grid-cols-2">
          {filteredRecipes.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="recipe-card  bg-blue-300 flex p-10  border-blue-500 border-solid border-1 m-2 overflow-hidden"
              >
                <div className="recipe-left mr-10 text-center">
                  {/* <Link to={`/allRecipes/${recipe.id}`}> */}
                  <img
                    src={recipe.image || "default-image.jpg"} // Replace 'default-image.jpg' with your actual default image URL or path
                    alt="Image Not Found"
                    className={`recipe-img h-40 w-48  border border-blue-500 object-cover ${
                      !recipe.image && "bg-gray-300"
                    }`}
                  />
                  {/* </Link> */}
                  {recipe.number_of_likes} Likes
                </div>
                <div className="recipe-right flex flex-col justify-between text-center ml-10">
                  <div className="recipe-name">
                    <i>{recipe.title}</i>
                  </div>
                  <div className="recipe-descrip">{recipe.description}</div>
                  <div>
                    <button
                      className="recipe-btn border-black border-solid border-2 p-2 rounded-3xl"
                      onClick={() => {
                        navigate(`/recipes/${recipe.id}`);
                      }}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
