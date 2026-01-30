"use client";
import { useState, useEffect, use } from "react";
import { validateLogin } from "@/app/utils/validation";
import { userInfo } from "node:os";

function SignupScreen({}) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  let userInput = {
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    password: "",
    confirm: "",
  };

  // const [userInput, setUserInput] = useState({
  //   firstname: "",
  //   lastname: "",
  //   age: "",
  //   username: "",
  //   password: "",
  //   confirm: "",
  // });

  function getInfo(input) {
    userInput += input;
  }

  function handleSignUp() {
    console.log(userInput);
    if (userInput.password !== userInput.confirm) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);

      async function saveProfile(profileObj) {
        try {
          const response = await fetch("/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileObj),
          });

          if (response.ok) {
          }
        } catch (error) {
          alert("Error saving profile: " + error.message);
        }
      }

      saveProfile(userInput);
    }
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
            getInfo({ firstname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            getInfo({ lastname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="number"
          placeholder="Age"
          onChange={(e) => {
            getInfo({ age: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            getInfo({ username: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            getInfo({ password: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Confirm"
          onChange={(e) => {
            getInfo({ confirm: e.target.value });
          }}
        />
        <button
          type="button"
          // type={passwordMatch ? "submit" : "button"}
          className="w-30 regButton"
          onClick={handleSignUp}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function LoginScreen({ setProfile }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [userValidated, setUserValidated] = useState(null);

  function handleLogin() {
    setUserValidated(validateLogin(loginInfo));
    userValidated && setProfile();
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

export default function Signup({ setProfile }) {
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
        {form ? <LoginScreen setProfile={setProfile} /> : <SignupScreen />}
      </div>
    </div>
  );
}
