export const fetchCommentsForRecipeFromAPI = (recipeId) => {
    return fetch(`http://localhost:8000/comments?recipeId=${recipeId}`, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
      },
    }).then((res) => res.json());
  };

export const postNewCommentToAPI = (newComment) => {
  return fetch(`http://localhost:8000/comments`, {
    method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment)
    })}