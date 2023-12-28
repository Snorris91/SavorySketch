export const fetchUserById = (user) => {
    return fetch(`http://localhost:8000/savoryusers/${user}`,
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}

export const editSavoryUser = (savoryUser) => {
    return fetch(`http://localhost:8000/savoryusers/${savoryUser.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savoryUser)
    })};

    export const fetchAllUserDetailById = (user) => {
        return fetch(`http://localhost:8000/savoryusers/${user}`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
            }
        }).then((res) => res.json())
    }