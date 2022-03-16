import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function UserInfo(props) {
  return (
    <div className="flex-row justifycontent-center">
      <div className="user-photo">
        <Avatar
          alt="User Upload"
          src={props.photo}
          sx={{ width: 50, height: 50 }}
        />
      </div>

      <div className="about-section">
        {" "}
        <Card sx={{ minWidth: 100, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.username}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserInfo;
