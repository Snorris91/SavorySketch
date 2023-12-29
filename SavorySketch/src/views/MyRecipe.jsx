import { useEffect, useState } from "react";
import {
  deleteRecipe,
  fetchAllRecipesFromAPI,
} from "../services/RecipeService";
import { fetchUserById } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export const MyRecipe = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [savoryUser, setSavoryUser] = useState([]);
  const navigate = useNavigate()

  const fetchAndSetSavoryUser = async () => {
    const tokenString = localStorage.getItem("token");
    const token = JSON.parse(tokenString);
    const userId = token.savoryuser_id;

    await fetchUserById(userId).then((userArray) => {
      setSavoryUser(userArray);
    });
  };

  const handleDelete = (recipe) => {
    deleteRecipe(recipe).then(() => {
      fetchAndSetRecipes()
      fetchAndSetSavoryUser()
    })

  }

  const fetchAndSetRecipes = () => {
    fetchAllRecipesFromAPI().then((recipeArray) => {
      setAllRecipes(recipeArray);
    });
  };
  useEffect(() => {
    fetchAndSetRecipes();
    fetchAndSetSavoryUser();
  }, []);
  useEffect(() => {
    const recipes = allRecipes.filter(
      (recipe) => recipe.user.id === savoryUser.id
    );
    setFilteredRecipes(recipes);
  }, [allRecipes, savoryUser.id]);

  return (
    <>
      <div>
        <h1 className="title font-bold text-3xl text-center">My Recipes</h1>
        <div className="recipes m-5 grid lg:grid-cols-3 sm:grid-cols-2">
          {filteredRecipes.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="recipe-card  bg-blue-300 flex p-10  border-blue-500 border-solid border-1 m-2 overflow-hidden"
              >
                <div className="recipe-left text-center">
                  {/* <Link to={`/MyRecipes/${recipe.id}`}> */}
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-img border border-blue-500 mb-2 h-[250px] w-[250px]"
                  />
                  {/* </Link> */}
                  {recipe.number_of_likes} Likes
                </div>
                <div className="recipe-right flex flex-col justify-center justify-between text-center ml-10">
                  <div className="recipe-name">
                    <i>{recipe.title}</i>
                  </div>
                  <div className="recipe-descrip">{recipe.description}</div>
                  <div className="myRecipe-btn flex">
                    <button className="recipe-btn border-black border-solid border-2 p-2 rounded-3xl m-2" onClick={() => {
                      navigate(`/recipes/${recipe.id}`)
                    }}>
                      View Recipe
                    </button>
                    <button className="recipe-btn border-black border-solid border-2 p-2 rounded-3xl m-2" onClick={() => {
                      handleDelete(recipe.id)
                    }}>
                      Delete Recipe
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
