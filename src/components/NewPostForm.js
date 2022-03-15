import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NewPostButton from "./NewPostButton";
import { useState, useEffect } from "react";
import CloudinaryUploadWidget from "./Cloudinary/UploadWidget.js";

export default function FormPropsTextFields({
  setPosts,
  posts,
  getAllPost,
  photo,
  setLocation,
}) {
  const [token, setToken] = useState("");
  const [formState, setFormState] = useState({
    post_title: "",
    post_content: "",
    post_photo: photo,
  });
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  useEffect(() => {
    setFormState({ ...formState, post_photo: photo });
  }, [photo]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const createPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/post/addpost", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "created post data");
        getAllPost();
      });

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      setLocation(crd);
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
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
          label="Post Title"
          value={formState.post_title}
          onChange={(e) =>
            setFormState({ ...formState, post_title: e.target.value })
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Post Content"
          value={formState.post_content}
          onChange={(e) =>
            setFormState({ ...formState, post_content: e.target.value })
          }
        />
      </div>
      <button onClick={createPost}>Create Post</button>
    </Box>
  );
}
