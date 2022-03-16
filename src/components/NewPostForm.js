import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NewPostButton from "./NewPostButton";
import { useState, useEffect } from "react";
import CloudinaryUploadWidget from "./Cloudinary/UploadWidget.js";
import prefixURL from "../utils/helper";

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
    post_latitude: 0,
    post_longitude: 0,
  });
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setFormState({
      ...formState,
      post_latitude: crd.latitude,
      post_longitude: crd.longitude,
    });

    console.log(formState);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    setFormState({ ...formState, post_photo: photo });
  }, [photo]);

  const createPost = (e) => {
    e.preventDefault();
    console.log(formState, "create post func");
    fetch(`${prefixURL}/api/post/addpost`, {
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
      <button onClick={createPost} class="cloudinary-button">
        Create Post
      </button>
    </Box>
  );
}
