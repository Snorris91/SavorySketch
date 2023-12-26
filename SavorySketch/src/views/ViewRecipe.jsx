import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { fetchOneRecipeFromAPI } from "../services/RecipeService";
import { fetchCommentsForRecipeFromAPI } from "../services/CommentService";

export const ViewRecipe = () => {
  const [recipe, setRecipe] =  useState({
    title: '',
    description: '',
    image: '',
    directions: '',
    cuisine: {},
    recipe_ingredients: [],
  });
  const { recipeId } = useParams();
  const [comments, setComments] = useState([]);
  const [formattedIngredients, setFormattedIngredients] = useState([]);


  const fetchAndSetThisRecipe = () => {
    fetchOneRecipeFromAPI(recipeId).then((recipeArray) => {
      setRecipe(recipeArray);
    });
  };
  const fetchAndSetComments = () => {
    fetchCommentsForRecipeFromAPI(recipeId).then((commentArray) => {
      setComments(commentArray);
    });
  };


  useEffect(() => {
    fetchAndSetThisRecipe();
    fetchAndSetComments();
  }, [recipeId]);

  useEffect(() => {
    // Update state when the recipe prop changes
    setRecipe(recipe);

    // Extract and format the ingredients
    const formattedIngredients = recipe.recipe_ingredients.map((ingredient) => ({
      label: ingredient.ingredient.label,
      measurement: ingredient.measurement.name,
    }));

    // Update state for formatted ingredients
    setFormattedIngredients(formattedIngredients);
  }, [recipe]);

  return (
    <div>
      Hello World!
      <div
        key={recipe.id}
        className="recipe-card flex p-10 border-black border-solid border-2 m-4 "
      >
        <div className="recipe-left flex flex-col mr-10 text-center w-1/3">
          {/* <Link to={user profile}> */}
          <span>By: {recipe.user?.user.username}</span>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-img h-[300px] w-[350px] self-center"
          />
          {/* </Link> */}
          <div>Cuisine: {recipe.cuisine.name}</div>
          <div>{recipe.number_of_likes} Likes</div>
          <div>Date Posted: {recipe.publication_date}</div>
          <button className="comment border-2 border-solid border-black p-3 rounded-3xl">
            Leave A Comment
          </button>
        </div>
        <div className="recipe-right w-2/3">
          <div className="recipe-name">
            <i>{recipe.title}</i>
          </div>
          <div className="recipe-description">{recipe.description}</div>
          <div className="recipe-ing">
          <h2>Ingredients</h2>
        <ul>
          {formattedIngredients.map((formattedIngredient, index) => (
            <li key={index}>
              {formattedIngredient.measurement} {formattedIngredient.label}
            </li>
          ))}
        </ul>

          </div>
          <div>
            <div>Directions:</div>
            <div>{recipe.directions}</div>
          </div>
          <div>
            <div>Comments</div>
            {comments.map((comment) => {
              return (
                <>
                  {/* Add additional logic for user img and formatting */}

                  <div key={comment.id}>
                    <div>
                      {comment.user.user.username} said "{comment.content}"
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
