import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import "../styles/style.css";
import { useEffect, useState } from "react";
import Login from "./Login";
// import PostModal from "../components/PostModal";
import CloudinaryUploadWidget from "../components/Cloudinary/UploadWidget";
import AddPost from '../components/AddPost'
import NewPostForm from '../components/NewPostForm';
import prefixURL from "../../utils/helper";

export default function Dashboard() {
  //Creating a use state for posts
  const [posts, setPosts] = useState([]);
  //front end fetch request to collect all of the posts

  const getAllPost = () => {
    fetch(`${prefixURL}/api/post/getallposts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "post data");
        setPosts(data);
      });
  }

  useEffect(() => {
    getAllPost()
  }, []);
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

  console.log(posts, "publicc posts");
  console.log(user, "loggedin user")
  //passing in all the 'prop' values that we are using in the postcard.js file.returns a new postcard
  return (
    <>
      {user ? (
        <div className="dashboard-flex flex-row">
          <div className="postcards">
            <NewPostForm setPosts={setPosts} posts={posts} getAllPost={getAllPost} />
            <CloudinaryUploadWidget />
            {/* <AddPost setPosts={setPosts} />
            <PostModal setPosts={setPosts} /> */}
            <div className="postContent">
              {posts.map((post) => (
                <Postcard
                  key={post.id}
                  username={post.User?.user_name}
                  UserId={post.UserId}
                  title={post.post_title}
                  content={post.post_content}
                  comments={post.Comments.map((Comment) => Comment)}
                />
              ))}
            </div>
          </div>
          <div>
            <Map posts={posts} />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
