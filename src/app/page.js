"use client";

import Header from "@/app/components/header";
import Post from "@/app/components/post";
import LandingPage from "./components/landing";
import { useEffect, useState } from "react";

function LoggedIn({ profile, setProfile }) {
  return (
    <div>
      <Header setProfile={setProfile}></Header>
      <p className="flex w-full p-5 justify-center align-middle text-lg">
        Hello {profile.firstname}
      </p>{" "}
      <div className="flex flex-col items-center justify-center h-full p-10 gap-6">
        <Post caption="Baby" imageSrc="/images/1.JPEG" />
        <Post caption="Hello" imageSrc="/images/3.JPEG" />
      </div>
    </div>
  );
}

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    //console.log(profile);
  });

  // add a if check for null in profile if so render empty tag
  if (profile === null) return <LandingPage setProfile={setProfile} />;
  else return <LoggedIn setProfile={setProfile} profile={profile} />;
}
