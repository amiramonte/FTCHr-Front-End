import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import prefixURL from "../utils/helper";
import CloudinaryUploadWidget from "../components/Cloudinary/PetUploadWidget";

export default function NewPetForm({ setPets }) {
  const [token, setToken] = useState("");
  const [petPhoto, setpetPhoto] = useState("");
  //Pet information
  const [formState, setFormState] = useState({
    pet_name: "",
    pet_species: "",
    pet_age: 0,
    pet_size: 0,
    pet_personality: "",
    pet_breed: "",
    pet_photo: petPhoto,
  });

  //Upload photo for pets
  useEffect(() => {
    setFormState({ ...formState, pet_photo: petPhoto });
  }, [petPhoto]);
  //Verifying user token
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const createPet = (e) => {
    e.preventDefault();
    console.log(formState, "create pet function");
    fetch(`${prefixURL}/api/pet/addpet`, {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "created new pet");
        //pet photo
        console.log(petPhoto, "PET PHOTO");
        setPets((prev) => [...prev, data]);
      });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Name"
            value={formState.pet_name}
            onChange={(e) =>
              setFormState({ ...formState, pet_name: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Species"
            value={formState.pet_species}
            onChange={(e) =>
              setFormState({ ...formState, pet_species: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Age"
            value={formState.pet_age}
            onChange={(e) =>
              setFormState({ ...formState, pet_age: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Size"
            value={formState.pet_size}
            onChange={(e) =>
              setFormState({ ...formState, pet_size: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Personality"
            value={formState.pet_personality}
            onChange={(e) =>
              setFormState({ ...formState, pet_personality: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Pet Breed"
            value={formState.pet_breed}
            onChange={(e) =>
              setFormState({ ...formState, pet_breed: e.target.value })
            }
          />
        </div>
        <button onClick={createPet} class="cloudinary-button">
          Add your pet
        </button>
      </Box>

      <CloudinaryUploadWidget setpetPhoto={setpetPhoto} />
    </div>
  );
}
