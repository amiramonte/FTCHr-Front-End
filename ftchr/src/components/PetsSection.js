import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PetSection() {
  return (
    <div className="flex-row justifycontent-center">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/assets/images/golden-retriever-dog.jpg"
          alt="User Upload"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Gus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            He a good boy
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/assets/images/golden-retriever-dog.jpg"
          alt="User Upload"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Douglas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            He a good boy too
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default PetSection;
