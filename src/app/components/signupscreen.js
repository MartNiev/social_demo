"use client";
import { useState, useEffect, use } from "react";

export default function SignupScreen() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {}, [userInput]);

  function handleSignUp() {
    console.log(userInput);
    if (userInput.password !== userInput.confirm) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);

      if (
        !(
          userInput.firstname &&
          userInput.lastname &&
          userInput.age &&
          userInput.username &&
          userInput.password &&
          userInput.confirm
        )
      )
        return setEmptyFields(true);

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
        {emptyFields ? (
          <p className="formMessage">All fields are required</p>
        ) : (
          <></>
        )}

        <input
          className="formInput"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setUserInput({ ...userInput, firstname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setUserInput({ ...userInput, lastname: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setUserInput({ ...userInput, age: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUserInput({ ...userInput, username: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserInput({ ...userInput, password: e.target.value });
          }}
        />
        <input
          className="formInput"
          type="password"
          placeholder="Confirm"
          onChange={(e) => {
            setUserInput({ ...userInput, confirm: e.target.value });
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
