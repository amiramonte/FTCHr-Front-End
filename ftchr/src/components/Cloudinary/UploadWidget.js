import React, { Component } from "react";
// import CloudinaryUploadWidget from "cloudinary-react";

// Where do we want the upload to occur? The button has an 'click' event listener to upload the photo to the cloudinary server.

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "ftchr",
        uploadPreset: "ftchrnovowelsbaby",
        sources: ["url", "camera", "local"],
        cropping: true,
        multiple: false,
        defaultSource: "local",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
