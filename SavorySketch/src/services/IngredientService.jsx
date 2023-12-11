export const fetchAllIngredientsFromAPI = () => {
    return fetch("http://localhost:8000/ingredients",
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}