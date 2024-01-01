import { useEffect, useState } from "react";
import { fetchAllRecipesFromAPI } from "../services/RecipeService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";
import { useNavigate } from "react-router-dom";

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
                className="recipe-card flex justify-between bg-blue-300 p-10  border-blue-500 border-solid border-2 m-2"
              >
                <div className="recipe-left text-center">
                  <img
                    src={recipe.image || "default-image.jpg"}
                    alt="Image Not Found"
                    className={`recipe-img h-32 w-40 object-cover border border-blue-500 ${
                      !recipe.image && "bg-gray-300"
                    }`}
                  />
                  {recipe.number_of_likes} Likes
                </div>
                <div className="recipe-right flex flex-col justify-between text-center ">
                  <div className="recipe-name">
                    <i>{recipe.title}</i>
                  </div>
                  <div className="recipe-descrip">{recipe.description}</div>
                  <div>
                    <button
                      className="btn-view"
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
