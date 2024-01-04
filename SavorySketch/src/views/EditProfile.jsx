import { useEffect, useState } from "react";
import { editSavoryUser, fetchUserById } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [savoryUser, setSavoryUser] = useState([]);
  const fetchAndSetSavoryUser = async () => {
    const tokenString = localStorage.getItem("token");
    const token = JSON.parse(tokenString);
    const userId = token.savoryuser_id;

    await fetchUserById(userId).then((userArray) => {
      setSavoryUser(userArray);
    });
  };

  useEffect(() => {
    fetchAndSetSavoryUser();
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedSavoryUser = {
      id: savoryUser.id,
      profile_img: savoryUser.profile_img,
      biography: savoryUser.biography,
    };

    editSavoryUser(updatedSavoryUser).then(() => {
      navigate(`/profile`);
    });
  };

  return (
    <>
      <h1 className="title m-5 text-4xl text-center text-white font-bold">
        Edit Profile
      </h1>

      <form className="form flex justify-center ">
        <div className="form-area bg-blue-300 p-10  border-blue-500 border-solid border-2 w-[350px]">
          <fieldset>
            <div className="bio flex flex-col text-center">
              <label>Biography:</label>
              <textarea
                name="biography"
                rows="10"
                value={savoryUser?.biography ? savoryUser?.biography : ""}
                type="text"
                placeholder="Biography"
                onChange={(event) => {
                  const savoryUserCopy = { ...savoryUser };
                  savoryUserCopy.biography = event.target.value;
                  setSavoryUser(savoryUserCopy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
              <div className="img flex flex-col text-center mt-2">
                <label>Profile Picture:</label>
                <input
                  name="profile_img"
                  value={savoryUser?.profile_img ? savoryUser?.profile_img : ""}
                  type="text"
                  onChange={(event) => {
                    const savoryUserCopy = { ...savoryUser };
                    savoryUserCopy.profile_img = event.target.value;
                    setSavoryUser(savoryUserCopy);
                  }}
                />
              </div>
          </fieldset>
          <fieldset>
              <div className="btn-container flex justify-center mt-4">
                <button className="button bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white font-bold py-2 px-4 rounded w-20 m-2" onClick={handleSave}>
                  Save
                </button>
              </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};
