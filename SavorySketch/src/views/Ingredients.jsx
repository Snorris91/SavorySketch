import { useEffect, useState } from "react";
import {
  fetchAllIngredientsFromAPI,
  postNewIngredient,
} from "../services/IngredientService";

export const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ label: "" });
  const [inputValue, setInputValue] = useState("");

  const fetchAndSetIngredients = () => {
    fetchAllIngredientsFromAPI().then((ingredientArray) => {
      setIngredients(ingredientArray);
    });
  };

  useEffect(() => {
    fetchAndSetIngredients();
  }, []);

  const sortedIngredients = [...ingredients].sort((a, b) => a.label.localeCompare(b.label));

  const submitIngredient = (event) => {
    event.preventDefault();
    postNewIngredient(newIngredient).then(() => {
      fetchAndSetIngredients();
      setInputValue("Add ingredient here");
    });
  };

  const handleInputChange = (e) => {
    const ingredientCopy = { ...newIngredient };
    ingredientCopy[e.target.name] = e.target.value;
    setInputValue(e.target.value);
    setNewIngredient(ingredientCopy);
  };

  return (
    <>
      <div className="title text-3xl text-center mb-4 font-bold text-white">
        All Ingredients!!
      </div>
      <div className="flex justify-center my-4">
          <div className="addIngredient flex-col bg-blue-300 border-blue-500 border-solid border-2 p-3 w-[550px]">
            <div className="ingredient-title ">
              <span className="ingred-title font-bold ">
                Don't see your Ingredient!?
              </span>
              <br></br> Would you like to add an Ingredient?
            </div>
            <fieldset>
              <input
                name="label"
                type="text"
                className="ingred-input border-black border-solid border-2 p-1 m-2"
                autoComplete="off"
                value={inputValue}
                required
                placeholder="Add ingredient here"
                onChange={handleInputChange}
              />
            </fieldset>
            <button
              className="button  bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-2 px-4 rounded w-20 m-2"
              onClick={submitIngredient}
            >
              Save
            </button>
          </div>
        </div>
      <div className="ingred-cont flex flex-col">
        <div className="ingredient-list flex flex-wrap">
          {sortedIngredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <div className="name m-1 list-none bg-gray-200 p-2 mb-2 rounded-md transition duration-300 hover:bg-red-600 hover:text-white cursor-pointer">
                  <li className="list-name">{ingredient.label}</li>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </>
  );
};
