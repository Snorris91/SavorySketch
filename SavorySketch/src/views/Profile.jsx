import { useEffect, useState } from "react"
import { fetchUserById } from "../services/UserService"





export const MyProfile = () => {

    const [savoryUser, setSavoryUser] = useState([])
    const fetchAndSetSavoryUser = () => {
        const tokenString = localStorage.getItem("token");
        const token = JSON.parse(tokenString);
        const userId = token.user_id;

        fetchUserById(userId).then((userArray) => {
            setSavoryUser(userArray)
        })
    }
    useEffect(() => {
        fetchAndSetSavoryUser()
    },[])


    return (
        <>
        <div>
                    <h1>OBI WON KENOBI</h1>

        </div>
        </>
    )
}