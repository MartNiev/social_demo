import { useState, useEffect, use } from "react";
import { validateLogin } from "@/app/utils/validation";

export default function LoginScreen({ setProfile }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [userValidated, setUserValidated] = useState(null);

  function handleLogin() {
    // setUserValidated(validateLogin(loginInfo));
    // userValidated && setProfile();

    async function loadUserProfile() {
      try {
        const response = await fetch("/api/load");
        const object = await response.json();
        return object;

        if (!response.ok) throw new Error("Network response not ok");
      } catch (error) {
        Alert("Error fetching api: " + error);
      }
    }

    loadUserProfile();
  }

  return (
    <>
      {/* {!userExist && (
        <p className="formMessage">
          Username or Password Does Not Match Our records
        </p>
      )} */}
      {!userValidated === false && (
        <p className="formMessage">Username or Password is incorrect</p>
      )}
      <form className="flex flex-col items-center gap-5 p-4">
        <input
          className="formInput"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, username: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        <button
          // type={userExist ? "submit" : "button"}
          type="button"
          className="w-30 regButton"
          onClick={handleLogin}
        >
          Submit
        </button>
      </form>
    </>
  );
}
