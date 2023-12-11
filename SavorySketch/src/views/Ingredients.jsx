import { useEffect, useState } from "react"
import { fetchAllIngredientsFromAPI } from "../services/IngredientService"




export const Ingredients = () => {

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        fetchAllIngredientsFromAPI().then((ingredientArray) => {
            setIngredients(ingredientArray)
        })
    }, [])


    return (
        <>
        <div>
                    <h1>General KENOBI</h1>

        </div>
        </>
    )
}