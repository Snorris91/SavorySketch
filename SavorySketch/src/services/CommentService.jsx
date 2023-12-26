export const fetchCommentsForRecipeFromAPI = (recipeId) => {
    return fetch(`http://localhost:8000/comments?recipeId=${recipeId}`, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
      },
    }).then((res) => res.json());
  };