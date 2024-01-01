import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
<ul className="navbar bg-blue-300 m-4 p-5 rounded-lg shadow-md border-2 border-blue-500">
                <li className="navbar__item pl-10">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/recipes"}>All Recipes</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/addrecipes"}>Add A Recipe</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/myrecipes"}>My Recipes</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/cuisines"}>Cuisines</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/ingredients"}>Ingredients</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-black hover:text-purple-700" to={"/profile"}>Profile</NavLink>
            </li>
            {
                (localStorage.getItem("token") !== null) ?
                    <li className="navbar__item">
                        <button className="text-left underline text-black hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-black hover:text-purple-700" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-black hover:text-purple-700" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}