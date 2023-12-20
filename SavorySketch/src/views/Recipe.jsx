import { useEffect, useState } from "react";
import { fetchAllRecipesFromAPI } from "../services/RecipeService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";
import { Navigate, useNavigate } from "react-router-dom";

export const Recipe = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [allCuisines, setAllCuisines] = useState([])
  const [chosenCuisine, setChosenCuisine] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()


  const fetchAndSetAllRecipes = () => {
    fetchAllRecipesFromAPI().then((recipeArray) => {
      setAllRecipes(recipeArray);
    });
  };
const fetchAndSetAllCuisines = () => {
    fetchAllCuisineFromAPI().then((cuisineArray) => {
        setAllCuisines(cuisineArray)
    })
}

  useEffect(() => {
    fetchAndSetAllRecipes();
    fetchAndSetAllCuisines()
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
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredRecipes(foundRecipe);
  }, [searchTerm, allRecipes]);

  return (
    <>
      <div>
        <h1>Browse Savory Recipes</h1>
        <header className="page-header flex justify-evenly">
        <div className="drop-down-box">
          <select 
            onChange={(event) => {
              setChosenCuisine(event.target.value);
            }}
            type="filter"
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
        <h1>All recipes</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Here"
            className="search-field"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </header> 
        <div className="recipes m-5 grid lg:grid-cols-3 sm:grid-cols-2">
          {filteredRecipes.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe-card flex p-10 border-black border-solid border-2 m-4 overflow-hidden">
                <div className="recipe-left mr-10 text-center">
                  {/* <Link to={`/allRecipes/${recipe.id}`}> */}
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-img h-[250px] w-[250px]"
                  />
                  {/* </Link> */}
                  {recipe.number_of_likes} Likes
                </div>
                <div className="recipe-right flex flex-col justify-center justify-between text-center ml-10">
                <div className="recipe-name">
                  <i>{recipe.title}</i>
                </div>
                <div className="recipe-descrip">{recipe.description}</div>
                <div>
                    <button className="recipe-btn border-black border-solid border-2 p-2 rounded-3xl" onClick={() => {
                      navigate(`/recipes/${recipe.id}`)
                    }}>View Recipe</button>
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
