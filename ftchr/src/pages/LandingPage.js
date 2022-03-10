const [posts, setPosts] = useState([]);
// import Posts from "./??components??/Posts";
import {useEffect,useState} from "react";
import Posts from "./components/Posts";

function Posts() {
  const [Posts, setPosts] = useState([])
  const [userId, setUserId] = useState(0)
  const [token, setToken] = useState("")
  const [userData, setUserData] = useState({
    user_name:"",
    id:0,
  })

//   const [formState, setFormState] = useState({
//     user_name:'',
//     password:''
//   })

  const [postFormState, setPostFormState] = useState({
    post_title:"",
    post_content:''
  })

  useEffect(()=>{
    fetch("http://localhost:3001/api/posts").then(res=>res.json()).then(data=>{
      setPosts(data);
    })
  },[])
  return (
    <>
      <div>
        <h1>{userData.user_name}'s profile!!<button onClick={logout}>Logout</button></h1>
        your posts:
        {userData.Posts.map(post=><Post key={post.id} User={userData} title={post.title} body={post.body}/>)}
      </div>
    </>
  );
}

export default Posts;