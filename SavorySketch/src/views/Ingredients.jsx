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
      <div className="title text-3xl text-center mb-4">All Ingredients!!</div>
      <div className="ingred-cont flex">
        <div className="ingredient-list flex flex-wrap">
          {ingredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <div className="name m-1 list-none border-solid border-2 border-black p-2">
                  <li className="list-name">{ingredient.label}</li>
                </div>
              </div>
            );
          })}
        </div>
        <div className="addIngredient flex-col border-solid border-black border-2 p-3 w-[650px]">
          <div className="ingredient-title ">
            <span className="ingred-title font-bold ">Don't see your Ingredient!?</span><br></br> Would you like to add an Ingredient?
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
            className="button p-1.5 border-solid border-black border-2 rounded-xl w-20 m-2"
            onClick={submitIngredient}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
