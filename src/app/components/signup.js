import { setCurrentUser } from "@/app/utils/userProfile";
import createProfile from "@/app/utils/userProfile";
import { getFirstDynamicReason } from "next/dist/server/app-render/dynamic-rendering";
import { useState, useEffect, use } from "react";
import { validateLogin } from "@/app/utils/validation";
import { findProfile } from "@/app/utils/validation";

function SignupScreen() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    // console.log(userInfo);
  }, [userInfo]);

  function signingUp() {
    if (userInfo.password !== userInfo.confirm) return setPasswordMatch(false);
    else setPasswordMatch(true);

    createProfile(userInfo);

    setUserInfo({
      firstname: "",
      lastname: "",
      age: "",
      username: "",
      password: "",
      confirm: "",
    });
  }

  return (
    <div>
      <form id="signupForm" className="flex flex-col items-center gap-5 p-4">
        {!passwordMatch ? (
          <p className="formMessage" htmlFor="signupForm">
            Password DO NOT Match
          </p>
        ) : (
          <></>
        )}
        <input
          className="formInput"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setUserInfo({ ...userInfo, firstname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setUserInfo({ ...userInfo, lastname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setUserInfo({ ...userInfo, age: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUserInfo({ ...userInfo, username: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Confirm"
          onChange={(e) => {
            setUserInfo({ ...userInfo, confirm: e.target.value });
          }}
        />
        <button
          type={passwordMatch ? "submit" : "button"}
          className="w-30 regButton"
          onClick={signingUp}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function LoginScreen() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [userExist, setUserExist] = useState(true);
  const [userValidated, setUserValidated] = useState(null);

  useEffect(() => {
    localStorage.setItem("currentUser", loginInfo.username);
  }, [userValidated]);

  function handleLogin() {
    setUserExist(findProfile(loginInfo.username));

    userExist && setUserValidated(validateLogin(loginInfo));

    userValidated && alert("Logged in");
  }

  return (
    <>
      {!userExist && (
        <p className="formMessage">
          Username or Password Does Not Match Our records
        </p>
      )}
      {!userValidated && (
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

export default function Signup() {
  const [form, setForm] = useState(true);

  function changeScreen(stateValue) {
    setForm(stateValue);
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-2 flex justify-center items-center bg-blue-400">
        <h2 className="name">Social</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="flex justify-center gap-4 pb-3">
          <button className="regButton" onClick={() => changeScreen(true)}>
            Login
          </button>
          <button className="regButton" onClick={() => changeScreen(false)}>
            Signup
          </button>
        </div>
        {form ? <LoginScreen /> : <SignupScreen />}
      </div>
    </div>
  );
}
