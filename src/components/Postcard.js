import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import prefixURL from "../utils/helper";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Postcard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [token, setToken] = useState("");
  const [comments, setComments] = React.useState(props.comments);

  React.useEffect(() => {
    // setComments(props.comments);
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  React.useEffect(() => {
    setValue({ ...value, UserId: props.user.user_id });
  }, [props.user]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = React.useState({
    UserId: props.user.user_id,
    comment_body: "",
    PostId: props.post.id,
  });

  console.log("");
  const handleChange = async (event) => {
    setValue({ comment_body: event.target.value });
    setValue({ ...value, UserId: props.user.user_id, PostId: props.post.id });
    console.log(value, "supposed new comment we are going to use");
    fetch(`${prefixURL}/api/comment/addcomment`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // make a get route that gets all the comments for that post and set comments to be that then
        fetch(`${prefixURL}/api/comment/getpostcomments/${data.PostId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data, "data from the post comments routes");
            setComments(data);
            props.getAllPost();
            console.log(data, "created post data");
          });
      });
  };

  return (
    <div onClick={props.clickHandler}>
      <Card sx={{ maxWidth: 450 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.title}
          subheader={`by: ${props.username}`}
        />
        <CardMedia
          component="img"
          height="194"
          src={props.photo}
          alt="User upload"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "row",
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Leave Comment"
                  multiline
                  maxRows={4}
                  value={value.comment_body}
                  onChange={(e) =>
                    setValue({ ...value, comment_body: e.target.value })
                  }
                />
              </div>
              <Button
                class="commentButton"
                variant="outlined"
                size="small"
                fullWidth={false}
                onClick={handleChange}
              >
                Submit
              </Button>
            </Box>
            <Typography paragraph>Comments:</Typography>
            {comments.map((comment) => (
              <Typography key={comment.id}>
                <a href="#">{comment.User.user_name}</a>
                <span>: {comment.comment_body}</span>
              </Typography>
            ))}
            {/* <Typography paragraph>{props.comments}</Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
