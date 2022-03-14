import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewPostFrom from './NewPostForm'
import CloudinaryUploadWidget from "./Cloudinary/UploadWidget.js";


export default function SimpleAccordion({setPosts}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add a Post</Typography>
          <CloudinaryUploadWidget />
        </AccordionSummary>
        <AccordionDetails>
            <NewPostFrom setPosts={setPosts} />
            
        </AccordionDetails>
      </Accordion>
    </div>
  );
}