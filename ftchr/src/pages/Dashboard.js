import React from "react";
import Postcard from "../components/Postcard";
import Map from "../components/Map";
import "../styles/style.css";
import {useEffect,useState} from "react";

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    fetch("http://localhost:3001/api/post/getallposts").then(res=>res.json()).then(data=>{
      console.log(data);
      setPosts(data);
    })
  },[])

  const [comments, setComments] = useState([])
  useEffect(()=>{
    fetch("http://localhost:3001/api/comment/getallcomments").then(res=>res.json()).then(data=>{
      console.log(data);
      setComments(data);
    })
  },[])

  return (
    <div className="dashboard-flex flex-row">
      <div className="postcards">
        {posts.map(posts=><Postcard key={posts.id} username={posts.User.user_name} UserId={posts.UserId} title={posts.post_title} content={posts.post_content} comments={posts.Comments.map(Comments=>Comments.comment_body)} />)}
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}
