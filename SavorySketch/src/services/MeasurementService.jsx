export const fetchAllMeasurementsFromAPI = () => {
    return fetch("http://localhost:8000/measurements",
    {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token")).token}`
        }
    }).then((res) => res.json())
}
