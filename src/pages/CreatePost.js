// import React from "react";
// import "../styles/style.css";
// import { useEffect, useState } from "react";
// import Login from "./Login";
// import Postcard from "../components/Postcard";
// import CloudinaryUploadWidget from "../components/Cloudinary/UploadWidget";
// import PostModal from "../components/PostModal";
// import AddPost from '../components/AddPost'

// export default function Dashboard() {
//     //Creating a use state for posts
//     const [posts, setPosts] = useState([]);
//     //front end fetch request to collect all of the posts
  
//     useEffect(() => {
//       const savedToken = localStorage.getItem("token");
//       fetch("http://localhost:3001/api/user/verifieduser", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${savedToken}`,
//         },
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//             if (data.id) {
//             console.log(data, "data from the verified route");
//             setToken(savedToken);
//             setUser({
//               user_id: data.id,
//               user_name: data.user_name,
//             });
//           }
//         });
//     }, []);

//     return (
//       <div>
//         {user ? (
//           <div className="dashboard-flex flex-row">
//             <div className="postcards">
//               <CloudinaryUploadWidget />
//               <AddPost setPosts={setPosts} />
//               <PostModal setPosts={setPosts} />
//               <div className="postContent">
//                 {posts.map((post) => (
//                   <Postcard
//                     key={post.id}
//                     username={post.User.user_name}
//                     UserId={post.UserId}
//                     title={post.post_title}
//                     content={post.post_content}
//                     comments={post.Comments.map((Comment) => Comment)}
//                   />
//                 ))}
//               </div>
//             </div>
//         ) : ( 
//             <Login />
//         )}
//       </div>
//     )
//   }