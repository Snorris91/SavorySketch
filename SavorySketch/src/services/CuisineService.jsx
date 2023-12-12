export const fetchAllCuisineFromAPI = () => {
    return fetch("http://localhost:8000/cuisines",
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}

export const postNewCuisine = (cuisine) => {
    return fetch(`http://localhost:8000/cuisines` , {
        method: "POST",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cuisine),
    })
}