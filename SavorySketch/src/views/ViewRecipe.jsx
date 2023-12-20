import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { fetchOneRecipeFromAPI } from "../services/RecipeService"




export const ViewRecipe = () => {

    const [recipe, setRecipe] = useState([])
    const { recipeId } = useParams()

    const fetchAndSetThisRecipe = () => {
        fetchOneRecipeFromAPI(recipeId).then((recipeArray) => {
            setRecipe(recipeArray)
        })
    }

    useEffect(() => {
        fetchAndSetThisRecipe()
    },[recipeId])


    return (
        <>
        <div>
            Hello World!
            </div></>
    )
}