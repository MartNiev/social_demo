"use client";
import { useState, useEffect, use } from "react";
import Message from "@/app/components/uiMessage";

export default function SignupScreen() {
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [submitButton, setSubmitButton] = useState(true);
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    password: "",
    confirm: "",
  });

  function handleSignUp() {
    if (
      !(
        userInput.firstname &&
        userInput.lastname &&
        userInput.age &&
        userInput.username &&
        userInput.password &&
        userInput.confirm
      )
    ) {
      setEmptyFields(true);
      setSubmitButton(false);
      return;
    } else {
      setEmptyFields(false);
      setSubmitButton(true);
    }

    if (userInput.password !== userInput.confirm) {
      setPasswordNotMatch(true);
      setSubmitButton(true);
      return;
    } else {
      setPasswordNotMatch(false);
      setSubmitButton(false);

      async function saveProfile(profileObj) {
        try {
          const response = await fetch("/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileObj),
          });

          if (!response.ok) {
          }
        } catch (error) {
          alert("Error saving profi " + error.message);
        }
      }

      async function loadUserList() {
        try {
          const response = await fetch("/api/load?name=userList");
          const userList = await response.json();

          for (const user of userList.username) {
            if (userInput.username === user) {
              setUserExist(true);
              setSubmitButton(false);
              return;
            } else {
              setUserExist(false);
              setSubmitButton(true);
            }
          }

          saveProfile(userInput);
        } catch (error) {
          alert("Error loading file: " + error.message);
        }
      }

      loadUserList();
    }
  }

  return (
    <div>
      <form id="signupForm" className="flex flex-col items-center gap-5 p-4">
        <Message
          condition={passwordNotMatch}
          message="Password does NOT Match."
        />
        <Message condition={emptyFields} message="All fields are required." />
        <Message condition={userExist} message="Username is Taken!" />
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
          //type="button"
          type={submitButton ? "submit" : "button"}
          className="w-30 regButton"
          onClick={handleSignUp}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
