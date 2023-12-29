import { useEffect, useState } from "react";
import { editSavoryUser, fetchUserById } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {

    const navigate = useNavigate()
    const [savoryUser, setSavoryUser] = useState([])
    const fetchAndSetSavoryUser = async () => {
        const tokenString = localStorage.getItem("token");
        const token = JSON.parse(tokenString);
        const userId = token.savoryuser_id;

        await fetchUserById(userId).then((userArray) => {
            setSavoryUser(userArray)
        })
    }

    useEffect(() => {
        fetchAndSetSavoryUser()
    },[])

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
    <form className="form text-center">
      <h1 className="title m-5 text-4xl">Edit Profile</h1>
      <fieldset>
        <div>
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
        <div>
          <div>
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
        </div>
      </fieldset>
      <fieldset>
        <div>
          <div className="btn-container">
            <button className="btn-area" onClick={handleSave}>Save</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};