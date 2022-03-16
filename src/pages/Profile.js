import React from "react";
import UserInfo from "../components/UserInfo";
import PetSection from "../components/PetsSection";
import "../styles/style.css";
import { useEffect, useState } from "react";
import prefixURL from "../utils/helper";
import NewPetForm from "../components/NewPetForm";

function Profile() {
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState({
    user_id: 0,
    user_name: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    fetch(`${prefixURL}/api/user/verifieduser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${savedToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.Pets);
        setPets(data.Pets);
        console.log(pets);
        if (data.id) {
          // console.log(data, "data from the verified route");
          setToken(savedToken);
          setUser({
            user_id: data.id,
            user_name: data.user_name,
          });
        }
      });
  }, []);

  return (
    <div className="">
      <div className="user-info">
        <UserInfo username={user.user_name} />
        <NewPetForm setPets={setPets} />
      </div>
      <div className="flex-row justifycontent-center">
        {pets.map((pets) => (
          <PetSection
            key={pets.id}
            photo={pets.pet_photo}
            petname={pets.pet_name}
            petspecies={pets.pet_species}
            petage={pets.pet_age}
            petsize={pets.pet_size}
            petbreed={pets.pet_breed}
            petpersonality={pets.pet_personality}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
