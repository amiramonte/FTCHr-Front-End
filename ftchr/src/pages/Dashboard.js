import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import "../styles/style.css";
import { useEffect, useState } from "react";
import Login from "./Login";
import PostModal from '../components/PostModal'
import moment from 'moment'

export default function Dashboard() {
  //Creating a use state for posts
  const [posts, setPosts] = useState([]);
  //front end fetch request to collect all of the posts

  var timer = setInterval(function() {
    let currentTime = parseInt(moment().format("HH"));
    if(currentTime === 0) {
        setPosts([]);
    }
}, 600000)

  useEffect(() => {
    fetch("http://localhost:3001/api/post/getallposts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.reverse());
      });
  }, []);
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

  // const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3001/api/comment/getallcomments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setComments(data);
  //     });
  // }, []);
  console.log(posts, "publoc posts")
  //passing in all the 'prop' values that we are using in the postcard.js file.returns a new postcard
  return (
    <>
      {user ? (
        <div className="dashboard-flex flex-row">
          <div className="postcards">
            <PostModal setPosts={setPosts}/>
            <div className="postContent">
            {posts.map((post) => (
              <Postcard
                key={post.id}
                username={post.User.user_name}
                UserId={post.UserId}
                title={post.post_title}
                content={post.post_content}
                comments={post.Comments.map(
                  (Comments) => Comments.comment_body
                )}
              />
            ))}
            </div>
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
