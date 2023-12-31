export const fetchAllIngredientsFromAPI = () => {
    return fetch("http://localhost:8000/ingredients",
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}

export const postNewIngredient = (ingredient) => {
    return fetch(`http://localhost:8000/ingredients` , {
        method: "POST",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ingredient),
    })
}