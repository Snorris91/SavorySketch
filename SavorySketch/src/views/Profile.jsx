import { useEffect, useState } from "react"
import { fetchUserById } from "../services/UserService"
import { useNavigate } from "react-router-dom"





export const MyProfile = () => {

    const navigate = useNavigate()
    const [savoryUser, setSavoryUser] = useState([])
    const fetchAndSetSavoryUser = async () => {
        const tokenString = localStorage.getItem("token");
        const token = JSON.parse(tokenString);
        const userId = token.savoryuser_id;

        await fetchUserById(userId).then((userArray) => {
            setSavoryUser(userArray)
        })
    }

    useEffect(() => {
        fetchAndSetSavoryUser()
    },[])


    return (
        <>
        <div>
                    <h1 className="title text-center text-4xl">Your Profile</h1>
                    <div className="profile-card flex justify-evenly">
                        <div className="profile-left text-center m-1">

            <span>{savoryUser.user?.full_name}</span>
            <img src={savoryUser.profile_img} alt="Profile Image" className="image h-[250px] w-[250px]" />
            <span className="cantact font-bold">Date Joined:</span> {savoryUser.created_on}
                        </div>
                        <div className="profile-right flex flex-col text-center justify-evenly">

                    <div>
                    <span className="cantact font-bold">Biography<br></br></span>
                        {savoryUser.biography}
                    </div>
                    <div>
                        <span className="cantact font-bold">Contact<br></br>
                        </span>{savoryUser.user?.email}
                    </div>
                    <div className="profile-button flex justify-center">

                    <button onClick={() => {
                navigate(`/myRecipes`);
              }} className="recipe-btn border-black border-solid border-2 p-2 rounded-3xl w-40 m-2">View My Recipes</button>
                    <button onClick={() => {
                navigate(`/profile/${savoryUser.id}/edit`);
              }} className="recipe-btn m-2 border-black border-solid border-2 p-2 rounded-3xl w-40">Edit Profile</button>

                    </div>
                        </div>
</div>
        </div>
        </>
    )
}