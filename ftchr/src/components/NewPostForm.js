import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NewPostButton from "./NewPostButton";
import { useState, useEffect } from "react";

export default function FormPropsTextFields({ setPosts }) {
  const [token, setToken] = useState("");
  const [formState, setFormState] = useState({
    post_title: "",
    post_content: "",
  });
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

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
        setPosts(prevTodos => [...prevTodos, data]);
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
      <button onClick={createPost}>Create Post</button>
    </Box>
  );
}