"use client";

import Header from "@/app/components/header";
import Post from "@/app/components/post";
import Signup from "./components/signup";
import { useEffect, useState } from "react";

function LoggedIn({ profile }) {
  return (
    <div>
      <Header />
      {/* <h2>Hello, {profile.firstname}</h2> */}
      <div className="flex flex-col items-center justify-center h-full p-10 gap-6">
        <Post caption="Baby" imageSrc="/images/1.JPEG" />
        <Post caption="Hello" imageSrc="/images/3.JPEG" />
      </div>
    </div>
  );
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileObj, setProfileObj] = useState(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
    alert(currentUser);
    setProfileObj(JSON.parse(localStorage.getItem(currentUser)));
  }, []);

  // console.log(profileObj);

  // add a if check for null in profile if so render empty tag
  return <div>{profileObj ? <LoggedIn /> : <Signup />}</div>;
}
