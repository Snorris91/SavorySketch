import { useEffect, useState } from "react";
import { fetchAllIngredientsFromAPI } from "../services/IngredientService";
import { fetchAllMeasurementsFromAPI } from "../services/MeasurementService";
import { fetchAllCuisineFromAPI } from "../services/CuisineService";

export const AddRecipe2 = () => {
  const [cuisines, setCuisines] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  


  
  
  

  return (
    <>
      <form className="form-area text-center">
        {/* Recipe Details Fields */}
        <fieldset>
          {/* ... other recipe detail input fields like title, description, etc. ... */}
        </fieldset>

        {/* Ingredient and Measurement Selection */}
        
      </form>
    </>
  );
};