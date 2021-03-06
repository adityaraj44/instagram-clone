import { React, useState } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
function ImageUpload({ username }) {
  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        color="secondary"
        variant="contained"
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => {
          setCaption(event.target.value);
        }}
        value={caption}
      />
      <Input color="secondary" type="file" onChange={handleChange} />
      <Button
        variant="outlined"
        color="primary"
        className="imageupload__button"
        onClick={handleUpload}
      >
        Upload
        <AddIcon />
      </Button>
    </div>
  );
}

export default ImageUpload;
