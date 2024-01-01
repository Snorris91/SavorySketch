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
                    <h1 className="title text-center text-4xl font-bold text-white ">Your Profile</h1>
                    <div className="profile-card flex justify-evenly  bg-blue-300 border-blue-500 border-solid border-2">
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
              }} className="btn-view">View My Recipes</button>
                    <button onClick={() => {
                navigate(`/profile/${savoryUser.id}/edit`);
              }} className="bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-700 text-white font-bold py-2 px-4 rounded ml-4">Edit Profile</button>

                    </div>
                        </div>
</div>
        </div>
        </>
    )
}