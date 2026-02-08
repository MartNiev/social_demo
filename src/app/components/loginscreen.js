import { useState, useEffect, use } from "react";
import { validateLogin } from "@/app/utils/validation";

export default function LoginScreen({ setProfile }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [validationMessage, setValidationMessage] = useState(true);

  useEffect(() => {}, []);

  function handleLogin() {
    if (!(loginInfo.username && loginInfo.password)) return;

    async function loadUserProfile() {
      try {
        const response = await fetch(`/api/load/?name=${loginInfo.username}`);
        const storedUserInfo = await response.json();

        const isValidated = validateLogin(storedUserInfo, loginInfo);

        if (isValidated) {
          setValidationMessage(true);
          setProfile(storedUserInfo);
        } else {
          setValidationMessage(false);
        }

        //console.log(storedUserInfo);
        //console.log(isValidated);
      } catch (error) {
        alert("Error fetching api: " + error);
      }
    }

    loadUserProfile();
  }

  return (
    <>
      {!validationMessage && (
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
