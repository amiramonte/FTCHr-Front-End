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

export default function Dashboard({user}) {
  //Creating a use state for posts
  const [posts, setPosts] = useState([]);
  //renders image from Cloudinary
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState([]);
  //front end fetch request to collect all of the posts

  const getAllPost = () => {
    fetch(`${prefixURL}/api/post/getallposts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "post data");
        setPosts(data);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  console.log(posts, "public posts");
  console.log(user, "loggedin user");
  //passing in all the 'prop' values that we are using in the postcard.js file.returns a new postcard
  return (
    <>
      {user ? (
        <div className="dashboard-flex flex-row">
          <div className="postcards">
            <NewPostForm
              setPosts={setPosts}
              posts={posts}
              getAllPost={getAllPost}
              photo={photo}
              setLocation={setLocation}
            />
            <CloudinaryUploadWidget setPhoto={setPhoto} />
            <div className="postContent">
              {posts.map((post) => (
                <Postcard
                  key={post.id}
                  post={post}
                  user={user}
                  photo={post.post_photo}
                  username={post.User?.user_name}
                  UserId={post.UserId}
                  title={post.post_title}
                  content={post.post_content}
                  comments={post.Comments.map((Comment) => Comment)}
                  getAllPost={getAllPost}
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
