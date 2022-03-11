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

  return (
    <div className="dashboard-flex flex-row">
      <div className="postcards">
        {posts.map(post=><Postcard key={posts.id} UserId={posts.UserId} title={posts.post_title} content={posts.posts_content} />)}
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}
