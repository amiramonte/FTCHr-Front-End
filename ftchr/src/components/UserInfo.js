import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { spacing } from "@mui/system";

function UserInfo() {
  return (
    <div className="flex-row justifycontent-center">
      <div className="user-photo">
        <Avatar alt="User Upload" src="" sx={{ width: 50, height: 50 }} />
      </div>

      <div className="about-section">
        {" "}
        <Card sx={{ minWidth: 100, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Username
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Just me and my two dogs, Gus and Douglas!
            </Typography>
            <Typography variant="body2">
              Gus is an American Pitbull Terrier and Douglas is a goofy lab mix
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Add Friend</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default UserInfo;
