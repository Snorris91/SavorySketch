export const fetchUserById = (user) => {
    return fetch(`http://localhost:8000/savoryusers/${user}`,
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}

