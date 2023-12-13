export const fetchAllRecipesFromAPI = () => {
  return fetch("http://localhost:8000/recipes", {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
    },
  }).then((res) => res.json());
};

export const fetchOneRecipeFromAPI = (recipe) => {
  return fetch(`http://localhost:8000/recipes/${recipe.id}`, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
    },
  }).then((res) => res.json());
};

export const fetchMyRecipesFromAPI = (user) => {
  return fetch(`http://localhost:8000/recipes/${user.id}`, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
    },
  }).then((res) => res.json());
};

export const submitNewRecipeToAPI = (payload) => {
  return fetch(`http://localhost:8000/recipes`, {
    method: "POST",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
