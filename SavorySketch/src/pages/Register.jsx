import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [email, setEmail] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        email: email,
        biography: biography,
        profile_img: profileImg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("token", JSON.stringify(authInfo));
          navigate("/profile");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <h1 className="text-4xl mt-7 mb-3 font-bold text-white text-center">Savory Sketch</h1>
        <h2 className="text-xl mb-10 font-bold text-white text-center">Register new account</h2>
        <form className="form--login flex justify-center" onSubmit={handleRegister}>
          <div className="form-area text-center bg-blue-300 p-10  border-blue-500 border-solid border-2 w-[350px]">
            <fieldset className="mb-4">
              <label htmlFor="firstName"> First name </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                className="form-control"
                placeholder="First Name"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="lastName"> Last name </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                className="form-control"
                placeholder="Last Name"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputEmail">Email </label>
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="email"
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputUsername"> Username </label>
              <input
                type="username"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputBiography"> Biography </label>
              <input
                type="biography"
                id="inputBiography"
                value={biography}
                onChange={(evt) => setBiography(evt.target.value)}
                className="form-control"
                placeholder="Biography"
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputProfile_img"> Profile_img </label>
              <input
                type="profile_img"
                id="inputProfile_img"
                value={profileImg}
                onChange={(evt) => setProfileImg(evt.target.value)}
                className="form-control"
                placeholder="Profile_img"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-blue-800 text-blue-100"
              >
                Register
              </button>
              <div className="loginLinks">
                <section className="link--register">
                  <Link
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    to="/login"
                  >
                    Already have an account?
                  </Link>
                </section>
              </div>
            </fieldset>
          </div>
        </form>
      </section>
    </main>
  );
};
