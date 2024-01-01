import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchAllUserDetailById } from "../services/UserService"
import { fetchAllRecipesFromAPI } from "../services/RecipeService"




export const OtherProfile = () => {

    const [savoryUser, setSavoryUser] = useState([])
    const [allRecipes, setAllRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const { userId } = useParams()
    const navigate = useNavigate()

    const fetchAndSetSavoryUser = (userId) => {
        fetchAllUserDetailById(userId).then((userArray) => {
            setSavoryUser(userArray)
        })
    }

    const fetchAndSetRecipes = () => {
        fetchAllRecipesFromAPI().then((recipeArray) => {
          setAllRecipes(recipeArray);
        });
      };

    useEffect(() => {
        fetchAndSetSavoryUser(userId)
        fetchAndSetRecipes()
    },[userId])

    useEffect(() => {
        const recipes = allRecipes.filter(
          (recipe) => recipe.user.id === savoryUser.id
        );
        setFilteredRecipes(recipes);
      }, [allRecipes, savoryUser.id]);


    return (
        <>
        <div>
                    <h1 className="title text-center text-4xl mb-6 font-bold text-white">Savory User <span>{savoryUser.user?.username}'s</span> Profile</h1>
                    <div className="profile-card flex justify-evenly bg-blue-200 border-blue-600 border-solid border-2 p-10">
                        <div className="profile-left flex flex-col text-center m-1">

            
            <img src={savoryUser.profile_img} alt="Profile Image" className="image h-[250px] w-[250px]" />
            <span className="cantact font-bold">Date Joined:</span> {savoryUser.created_on}
                    <div>
                        <span className="cantact font-bold">Contact:<br></br>
                        </span>{savoryUser.user?.email}
                    </div>
                    <div className="w-[300px]">
                    <span className="cantact font-bold">Biography<br></br></span>
                        {savoryUser.biography}
                    </div>
                        </div>
                    <div className="profile-right flex flex-col text-center justify-center">

                    <div className="title font-bold">My Recipes</div>
                    <div className="recipes m-2 self-center w-[350px]">
          {filteredRecipes.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="recipe-card flex flex-col p-2 bg-blue-300 border-blue-700 border-solid border-2 m-2  "
              >
                    <i>{recipe.title}</i>
                <div className="recipe flex justify-center m-2 text-center">
                  <div className="recipe-name mb-2">
                  </div>
                  {/* <Link to={`/MyRecipes/${recipe.id}`}> */}
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-img h-[150px] w-[150px]"
                  />
                  {/* </Link> */}
                </div>
                  <div>
                    <button className="btn-view" onClick={() => {
                      navigate(`/recipes/${recipe.id}`)
                    }}>
                      View Recipe
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
                    
                        </div>
</div>
        </div>
        </>
    )
}