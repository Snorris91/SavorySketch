import { useEffect, useState } from "react";
import {
  fetchAllRecipesFromAPI,
  fetchMyRecipesFromAPI,
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
    const userId = token.user_id;

    await fetchUserById(userId).then((userArray) => {
      setSavoryUser(userArray);
    });
  };

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
        <h1>Darth Vadar</h1>
        <div className="recipes m-5 grid lg:grid-cols-3 sm:grid-cols-2">
          {filteredRecipes.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="recipe-card flex p-10 border-black border-solid border-2 m-4 overflow-hidden"
              >
                <div className="recipe-left mr-10 text-center">
                  {/* <Link to={`/MyRecipes/${recipe.id}`}> */}
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
                    }}>
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
