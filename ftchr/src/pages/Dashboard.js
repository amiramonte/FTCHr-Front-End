import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import "../styles/style.css";
import { useEffect, useState } from "react";
import Login from "./Login";

export default function Dashboard() {
  //Creating a use state for posts
  const [posts, setPosts] = useState([]);
  //front end fetch request to collect all of the posts
  useEffect(() => {
    fetch("http://localhost:3001/api/post/getallposts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);
  //
  const [user, setUser] = useState({
    user_id: 0,
    user_name: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    fetch("http://localhost:3001/api/user/verifieduser", {
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
        // console.log(res);

        if (data.id) {
          console.log(data, "data from the verified route");
          setToken(savedToken);
          setUser({
            user_id: data.id,
            user_name: data.user_name,
          });
        }
      });
  }, []);

  //passing in all the 'prop' values that we are using in the postcard.js file.returns a new postcard
  return (
    <>
      {user ? (
        <div className="dashboard-flex flex-row">
          <div className="postcards">
            {posts.map((posts) => (
              <Postcard
                key={posts.id}
                username={posts.User.user_name}
                UserId={posts.UserId}
                title={posts.post_title}
                content={posts.post_content}
                comments={posts.Comments.map(
                  (Comments) => Comments.comment_body
                )}
              />
            ))}
          </div>
          <div>
            <Map />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
