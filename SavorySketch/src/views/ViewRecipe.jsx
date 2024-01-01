import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchOneRecipeFromAPI,
  updateRecipeLikesToAPI,
} from "../services/RecipeService";
import {
  fetchCommentsForRecipeFromAPI,
  postNewCommentToAPI,
} from "../services/CommentService";

export const ViewRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    directions: "",
    cuisine: {},
    recipe_ingredients: [],
  });
  const { recipeId } = useParams();
  const [comments, setComments] = useState([]);
  const [formattedIngredients, setFormattedIngredients] = useState([]);
  const manageComments = useRef(null);
  const [newComment, setNewComment] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(recipe.number_of_likes || 0);

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
    if (recipe.number_of_likes !== undefined) {
      setLikeCount(recipe.number_of_likes);
    }
  }, [recipe]);

  useEffect(() => {
    fetchAndSetThisRecipe();
    fetchAndSetComments();
  }, [recipeId]);

  useEffect(() => {
    // Update state when the recipe prop changes
    setRecipe(recipe);

    // Extract and format the ingredients
    const formattedIngredients = recipe.recipe_ingredients.map(
      (ingredient) => ({
        label: ingredient.ingredient.label,
        measurement: ingredient.measurement.name,
      })
    );

    // Update state for formatted ingredients
    setFormattedIngredients(formattedIngredients);
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const AddComment = {
      recipe: recipeId,
      content: newComment.content,
    };
    postNewCommentToAPI(AddComment).then(() => {
      fetchAndSetComments();
      handleCloseComments();
    });
  };

  const handleManageComments = () => {
    setIsModalOpen(true);
  };

  const handleCloseComments = () => {
    setIsModalOpen(false);
  };

  const handleLikeClick = () => {
    // Increment the like count
    setLikeCount((prevCount) => prevCount + 1);

    const newLikeCopy = {
      id: recipeId,
      number_of_likes: likeCount + 1,
    };
    updateRecipeLikesToAPI(newLikeCopy);
    fetchAndSetThisRecipe();
  };

  return (
    <>
      {isModalOpen && (
        <dialog
          className="manage-comment w-[450px] h-[250px] flex flex-col justify-center text-center rounded-3xl  bg-blue-200 p-10  border-blue-500 border-solid border-2"
          ref={manageComments}
        >
          <div className="comment-modal m-2">
            <fieldset>
              <h1 className="modal-window mb-2">Please leave a comment!</h1>
              <textarea
                rows="4"
                cols="40"
                className="input-text border-2 border-solid border-black p-2"
                onChange={(event) => {
                  const commentCopy = { ...newComment };
                  commentCopy.content = event.target.value;
                  setNewComment(commentCopy);
                }}
              />
            </fieldset>
          </div>
          <div className="comment-btn flex flex-row justify-evenly">
            <button
              className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button className="btn-delete" onClick={handleCloseComments}>
              Cancel
            </button>
          </div>
        </dialog>
      )}

      <div>
        <div
          key={recipe.id}
          className="recipe-card flex bg-blue-300 p-10  border-blue-500 border-solid border-2"
        >
          <div className="recipe-left flex flex-col mr-10 items-center text-center w-1/3">
            <Link
              key={recipe.user?.id}
              to={`/recipes/${recipe.user?.id}/profile`}
            >
              <span className="recipe-user mb-2">
                By: {recipe.user?.user.username}
              </span>
            </Link>
            <Link to={"/recipes"}>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-img h-[300px] w-[350px]"
              />
            </Link>
            <div>Cuisine: {recipe.cuisine.name}</div>
            <div>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              <button
                className="like-btn ml-2 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-1 px-1 rounded"
                onClick={handleLikeClick}
              >
                1UP!
              </button>
            </div>
            <div>Date Posted: {recipe.publication_date}</div>
            <button
              className="btn-view"
              onClick={() => {
                handleManageComments();
              }}
            >
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
                {formattedIngredients?.map((formattedIngredient, index) => {
                  return (
                    <li key={index + 1}>
                      {formattedIngredient.measurement}{" "}
                      {formattedIngredient.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div>Directions:</div>
              <div>{recipe.directions}</div>
            </div>
            <div>
              <div>Comments</div>
              {comments?.map((comment) => {
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
    </>
  );
};
