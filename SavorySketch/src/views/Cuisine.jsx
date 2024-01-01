import { useEffect, useState } from "react";
import {
  fetchAllCuisineFromAPI,
  postNewCuisine,
} from "../services/CuisineService";

export const Cuisines = () => {
  const [cuisines, setCuisines] = useState([]);
  const [newCuisine, setNewCuisine] = useState({ name: "" });
  const [inputValue, setInputValue] = useState("");

  const fetchAndSetCuisine = () => {
    fetchAllCuisineFromAPI().then((cuisineArray) => {
      setCuisines(cuisineArray);
    });
  };

  useEffect(() => {
    fetchAndSetCuisine();
  }, []);

  const submitCuisine = (event) => {
    event.preventDefault();
    postNewCuisine(newCuisine).then(() => {
      fetchAndSetCuisine();
      setInputValue("Add Cuisine here");
    });
  };

  const handleInputChange = (e) => {
    const cuisineCopy = { ...newCuisine };
    cuisineCopy[e.target.name] = e.target.value;
    setInputValue(e.target.value);
    setNewCuisine(cuisineCopy);
  };

  return (
    <>
      <div className="title text-3xl text-center mb-4 font-bold text-white">
        A list of all Cuisines!
      </div>
      <div>
        <div className="cuisine flex justify-center ">
          <div className="cuisine-list flex flex-wrap">
            {cuisines.map((cuisine) => {
              return (
                <div key={cuisine.id}>
                  <li className="name m-1 list-none bg-gray-200 p-2 mb-2 rounded-md transition duration-300 hover:bg-red-600 hover:text-white cursor-pointer">
                    {cuisine.name}
                  </li>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cuisine flex justify-center ">
          <div className="addCuisine flex flex-col bg-blue-300 border-blue-500 border-solid border-2 p-3 w-[550px] mt-4">
            <div>
              <span className="cuis-title font-bold ">
                Don't see your Cuisine!?
              </span>
              <br></br> Would you like to add a Cuisine?
            </div>
            <fieldset>
              <input
                name="name"
                type="text"
                className="cuisine-input border-black border-solid border-2 p-1 m-2"
                autoComplete="off"
                value={inputValue}
                required
                placeholder="Add Cuisine here"
                onChange={handleInputChange}
              />
            </fieldset>
            <button
              className="button bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-2 px-4 rounded w-20 m-2"
              onClick={submitCuisine}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
