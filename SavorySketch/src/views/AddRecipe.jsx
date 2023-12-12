import { useEffect, useState } from "react"
import { fetchUserById } from "../services/UserService"





export const AddRecipe = ({ currentUser }) => {


    const [user, setUser] = useState({})
    const [cuisine, setCuisine] = useState([])
    const [netRecipe, setNewRecipe] = useState({
        title: "",
        description: "",
        image: "",
        directions: "",
        cuisine: 0,
        user: 0
    })

    useEffect(() => {
        fetchUserById(currentUser).then((userObj) => {
            setUser(userObj)

        })
    },[currentUser])
                console.log(currentUser)
    return (
        <>
        <div>
                    <h1>Luke Skywalker</h1>

        </div>
        </>
    )
}