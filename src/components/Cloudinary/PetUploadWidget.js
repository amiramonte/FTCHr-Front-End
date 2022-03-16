import React, { Component } from "react";
// import CloudinaryUploadWidget from "cloudinary-react";
class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "ftchr",
        uploadPreset: "ftchrnovowelsbaby",
        sources: ["url", "camera", "local"],
        showSkipCropButton: false,
        multiple: false,
        defaultSource: "local",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image URL: ", result.info.url);
          this.props.setpetPhoto(result.info.url);
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
        Add a Photo
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
