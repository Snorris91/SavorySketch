import { useEffect, useState } from "react";
import { fetchAllIngredientsFromAPI } from "../services/IngredientService";
import { fetchAllMeasurementsFromAPI } from "../services/MeasurementService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";
import { submitNewRecipeToAPI } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";

export const AddRecipe = () => {
  const navigate = useNavigate()
  const [cuisines, setCuisines] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    cuisine: 0,
    title: "",
    description: "",
    image: "",
    directions: "",
  });
  const [transientItem, setTransientItem] = useState({
    ingredientId: "",
    ingredientName: "",
    measurementId: "",
    measurementName: "",
  });

  useEffect(() => {
    fetchAllIngredientsFromAPI().then(setIngredients);
    fetchAllMeasurementsFromAPI().then(setMeasurements);
    fetchAllCuisineFromAPI().then(setCuisines);
  }, []);


  const handleRecipeInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected Value:", value); // Debugging

    let nameField =
      name === "ingredientId" ? "ingredientName" : "measurementName";
    let selectedName;

    if (name === "ingredientId") {
      selectedName = ingredients.find(
        (ingredient) => ingredient.id.toString() === value
      )?.label;
    } else {
      selectedName = measurements.find(
        (measurement) => measurement.id.toString() === value
      )?.name;
    }

    console.log("Selected Name:", selectedName); // Debugging

    setTransientItem({
      ...transientItem,
      [name]: value,
      [nameField]: selectedName,
    });
  };

  const handleAddToList = () => {
    if (transientItem.ingredientId && transientItem.measurementId) {
      setRecipeItems([...recipeItems, transientItem]);
      setTransientItem({
        ingredientId: "",
        ingredientName: "",
        measurementId: "",
        measurementName: "",
      }); // Reset for next entry
    } else {
      alert("Please select both an ingredient and a measurement.");
    }
  };

  const handleDeleteFromList = (index) => {
    // Create a copy of the array without the item at the specified index
    const updatedRecipeItems = [...recipeItems];
    updatedRecipeItems.splice(index, 1);

    // Update the state with the new array
    setRecipeItems(updatedRecipeItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientIds = recipeItems.map((item) => item.ingredientId);
    const measurementIds = recipeItems.map((item) => item.measurementId);

    // Create a payload to send to the backend
    const payload = {
      ...newRecipe,
      ingredients: ingredientIds,
      measurements: measurementIds,
    };
    console.log("Submitting Recipe:", payload);
    try {
      const response = await submitNewRecipeToAPI(payload);
      if (response.ok) {
        console.log("Recipe submitted successfully");
      } else {
        console.error("Failed to submit recipe", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    navigate("/recipes")
  };

  return (
    <>
      <form
        className="form-area text-center bg-blue-300 p-10  border-blue-500 border-solid border-2"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="title text-3xl  mb-4">
            Would you like to add a recipe!?
          </h1>
          <fieldset>
            <div>
              <h1>Recipe title: </h1>
              <input
                name="title"
                type="text"
                className="form-field p-1 w-[500px]  mb-4"
                placeholder="Recipe title Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <h1>Recipe Image: </h1>
              <input
                name="image"
                type="text"
                className="form-field p-1 w-[500px]  mb-4"
                placeholder="Recipe Image URL Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <h1>Cuisines:</h1>
              <select
                className="form-field p-1 w-[500px] mb-4"
                name="cuisine"
                required
                onChange={handleRecipeInputChange}
              >
                <option value="0">Please Select an Cuisine</option>
                {cuisines.map((cuisine) => {
                  return (
                    <option value={cuisine.id} key={cuisine.id}>
                      {cuisine.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <h1>Recipe Description: </h1>
              <textarea
                name="description"
                type="text"
                rows="10"
                cols="100"
                className="form-field p-1"
                placeholder="Recipe Description Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>

          <div>
            <fieldset>
              <div className="ingredients flex justify-center">
                <div className="ingred-left my-4">
                  <h1>Ingredients!</h1>
                  <select
                    className="form-field p-1 mx-4"
                    name="ingredientId"
                    value={transientItem.ingredientId}
                    onChange={handleSelectChange}
                  >
                    <option value="">Please Select an Ingredient</option>
                    {ingredients.map((ingredient) => (
                      <option value={ingredient.id} key={ingredient.id}>
                        {ingredient.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ingred-right my-4">
                  <h1>Measurements!</h1>
                  <select
                    className="form-field p-1 mx-4"
                    name="measurementId"
                    value={transientItem.measurementId}
                    onChange={handleSelectChange}
                  >
                    <option value="">Please Select a Measurement</option>
                    {measurements.map((measurement) => (
                      <option value={measurement.id} key={measurement.id}>
                        {measurement.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-view mb-4"
                  onClick={handleAddToList}
                >
                  Add to List
                </button>
              </div>
            </fieldset>

            {/* Display List of Added Ingredients and Measurements */}
            <fieldset>
              <div className="flex justify-center items-center mb-4">
                <div className="border-t-2 border-r-2 border-b-2 border-l-2 border-blue-500 bg-blue-200 w-[600px]">
                  <h3>Added Ingredients and Measurements:</h3>
                  <ul>
                    {recipeItems.map((item, index) => (
                      <li key={index} className="list">
                        {`${item.measurementName} ${item.ingredientName}`}
                        <button
                          className="btn-delete p-0 ml-2"
                          type="button"
                          onClick={() => handleDeleteFromList(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4" // Adjusts the size
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>{" "}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div>
                <h1>Recipe Directions: </h1>
                <textarea
                  name="directions"
                  type="text"
                  rows="10"
                  cols="100"
                  maxLength="2000"
                  className="form-field p-1 mb-4"
                  placeholder="Recipe Directions Here"
                  autoComplete="off"
                  required
                  onChange={handleRecipeInputChange}
                />
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Recipe
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
