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
        src={props.photo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <span>Name: {props.petname}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Species: {props.petspecies}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Age: {props.petage} years old</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Weight: {props.petsize} lbs</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Breed: {props.petbreed}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span>Personality: {props.petpersonality}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PetSection;
