import React from "react";
import UserInfo from "../components/UserInfo";
import PetSection from "../components/PetsSection";
import "../styles/style.css";

function Profile() {
  return (
    <div className="">
      <div className="user-info">
        <UserInfo />
      </div>
      <div>
        <PetSection />
      </div>
    </div>
  );
}

export default Profile;
