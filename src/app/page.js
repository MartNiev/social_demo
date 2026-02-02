"use client";

import Header from "@/app/components/header";
import Post from "@/app/components/post";
import LandingPage from "./components/signup";
import { useEffect, useState } from "react";

function LoggedIn({ profile, setProfile }) {
  function handleSignOut() {
    setProfile(null);
  }

  return (
    <div>
      <Header />
      <p>Hello {profile.firstname}</p>
      <button className="regButton" onClick={handleSignOut}>
        signout
      </button>

      <div className="flex flex-col items-center justify-center h-full p-10 gap-6">
        {/* <Post caption="Baby" imageSrc="/images/1.JPEG" />
        <Post caption="Hello" imageSrc="/images/3.JPEG" /> */}
      </div>
    </div>
  );
}

export default function Home() {
  const [profile, setProfile] = useState({});

  // console.log(profileObj);

  // add a if check for null in profile if so render empty tag
  if (profile === null)
    return <LoggedIn setProfile={setProfile} profile={profile} />;
  else return <LandingPage setProfile={setProfile} />;
}
