import { useEffect, useState } from "react";
import { fetchUserById } from "../services/UserService";
import { fetchAllIngredientsFromAPI } from "../services/IngredientService";
import { fetchAllMeasurementsFromAPI } from "../services/MeasurementService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";
import { submitNewRecipeToAPI } from "../services/RecipeService";

export const AddRecipe = () => {
  const [cuisines, setCuisines] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    cuisine: 0,
    title: "",
    description: "",
    image: "",
    directions: ""
  });
  const [transientItem, setTransientItem] = useState({
    ingredientId: '',
    ingredientName: '',
    measurementId: '',
    measurementName: ''
  });

  useEffect(() => {
    fetchAllIngredientsFromAPI().then(setIngredients);
    fetchAllMeasurementsFromAPI().then(setMeasurements);
    fetchAllCuisineFromAPI().then(setCuisines);
  }, []);

  const handleInputChange = (e) => {
    const itemCopy = { ...newRecipe };
    itemCopy[e.target.name] = e.target.value;
    setNewRecipe(itemCopy);
  };   

  const handleRecipeInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };


  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected Value:", value); // Debugging
  
    let nameField = name === 'ingredientId' ? 'ingredientName' : 'measurementName';
    let selectedName;
  
    if (name === 'ingredientId') {
      selectedName = ingredients.find(ingredient => ingredient.id.toString() === value)?.label;
    } else {
      selectedName = measurements.find(measurement => measurement.id.toString() === value)?.name;
    }
  
    console.log("Selected Name:", selectedName); // Debugging
  
    setTransientItem({ ...transientItem, [name]: value, [nameField]: selectedName });
  };

  const handleAddToList = () => {
    if (transientItem.ingredientId && transientItem.measurementId) {
      setRecipeItems([...recipeItems, transientItem]);
      setTransientItem({ ingredientId: '', ingredientName: '', measurementId: '', measurementName: '' }); // Reset for next entry
    } else {
      alert("Please select both an ingredient and a measurement.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const ingredientIds = recipeItems.map(item => item.ingredientId);
    const measurementIds = recipeItems.map(item => item.measurementId);
  
    // Create a payload to send to the backend
    const payload = {
      ...newRecipe,
      ingredients: ingredientIds,
      measurements: measurementIds
    };
  
    console.log("Submitting Recipe:", payload);
  
    // Here, you can make a POST request to your backend with the payload
    // For example: axios.post('/api/recipes', payload);
    try {
        const response = await submitNewRecipeToAPI(payload);
        if (response.ok) {
          // Handle successful submission
          console.log("Recipe submitted successfully");
          // You might want to reset form or redirect user here
        } else {
          // Handle errors, such as displaying a message
          console.error("Failed to submit recipe", await response.json());
        }
      } catch (error) {
        // Handle any network errors
        console.error("Network error:", error);
      }
    // Reset form or navigate to another page if needed
    };



  return (
    <>
      <form className="form-area text-center" onSubmit={handleSubmit}>
        <div>
          <h1>Would you like to add a recipe!?</h1>
          <fieldset>
            <div>
              <h1>Recipe title: </h1>
              <input
                name="title"
                type="text"
                className="form-field"
                placeholder="Recipe title Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <h1>Recipe Description: </h1>
              <textarea
                name="description"
                type="text"
                rows="10"
                className="form-field"
                placeholder="Recipe Description Here"
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
                className="form-field"
                placeholder="Recipe Image Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <h1>Recipe Directions: </h1>
              <textarea
                name="directions"
                type="text"
                rows="10"
                maxLength="2000"
                className="form-field"
                placeholder="Recipe Directions Here"
                autoComplete="off"
                required
                onChange={handleRecipeInputChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <div>
              <h1>Cuisines!</h1>
              <select
                className="form-field"
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

          <div>
          <fieldset>
          <div>
            <h1>Ingredients!</h1>
            <select 
              className="form-field" 
              name="ingredientId" 
              value={transientItem.ingredientId}
              onChange={handleSelectChange}
            >
              <option value="">Please Select an Ingredient</option>
              {ingredients.map(ingredient => (
                <option value={ingredient.id} key={ingredient.id}>
                  {ingredient.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Measurements!</h1>
            <select 
              className="form-field" 
              name="measurementId" 
              value={transientItem.measurementId}
              onChange={handleSelectChange}
            >
              <option value="">Please Select a Measurement</option>
              {measurements.map(measurement => (
                <option value={measurement.id} key={measurement.id}>
                  {measurement.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="button" className="add-btn" onClick={handleAddToList}>Add to List</button>
          </div>
        </fieldset>

        {/* Display List of Added Ingredients and Measurements */}
        <fieldset>
          <h3>Added Ingredients and Measurements:</h3>
          <ul>
            {recipeItems.map((item, index) => (
              <li key={index}>
                {`Ingredient: ${item.ingredientName}, Measurement: ${item.measurementName}`}
              </li>
            ))}
          </ul>
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" >Submit Recipe</button>
      </div>
      </div>
      </form>
    </>
  );
};
