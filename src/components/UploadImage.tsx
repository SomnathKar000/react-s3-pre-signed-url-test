import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>("");
  const [result, setResult] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log(selectedFile.name);
    }
  };

  const getPresignedUrl = async () => {
    try {
      if (file) {
        const response = await axios.post(
          "https://aws-s3-pre-signed-url-generator.vercel.app/api/v1/upload",
          {
            fileName: file.name,
          }
        );
        setUrl(response.data.message);
        setResult(JSON.stringify(response.data.url));
        console.log(response);
      } else {
        setResult("No file selected");
      }
    } catch (error) {
      setResult("Error getting pre-signed URL:" + JSON.stringify(error));
      console.error("Error getting pre-signed URL:", error);
    }
  };

  const handleClick = async () => {
    if (url && file) {
      try {
        const result = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        setResult(JSON.stringify(result.data));
        console.log(result);
      } catch (error) {
        setResult(JSON.stringify(error));
        console.log(error);
      }
    } else {
      setResult("No file selected");
    }
  };

  return (
    <Stack direction="column" spacing={2} mt={5} alignItems="center">
      <input onChange={handleChange} type="file" />
      <Button onClick={getPresignedUrl} variant="outlined">
        Get Pre-signed URL
      </Button>
      <Button onClick={handleClick} variant="contained">
        Upload
      </Button>

      <Typography>The output is: {result}</Typography>
    </Stack>
  );
};

export default UploadImage;
