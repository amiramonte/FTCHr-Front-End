import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useEffect, useState } from "react";

function PetSection(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        min-height="140"
        min-width="100"
        alt="my pet"
        src={props.petPhoto}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.petname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.petspecies}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>{props.petage} years old</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>{props.petsize} lbs</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.petbreed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.petpersonality}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PetSection;
