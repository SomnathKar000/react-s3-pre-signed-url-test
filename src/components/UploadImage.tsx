import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const UploadImage = (props: {
  createAlert: (
    message: string,
    type: "error" | "info" | "success" | "warning"
  ) => void;
}) => {
  const { createAlert } = props;
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>("");
  const [fileName, setfileName] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const getPresignedUrl = async () => {
    setLoading(true);
    try {
      if (file) {
        const response = await axios.post(
          "https://aws-s3-pre-signed-url-generator.vercel.app/api/v1/upload",
          {
            fileName: file.name,
          }
        );
        setUrl(response.data.url);
        setLoading(false);
        console.log(response);
        createAlert("Successfully generated pre-signed URL", "success");
        setfileName(response.data.fileName);
      } else {
        setLoading(false);
        createAlert("No file selected", "warning");
      }
    } catch (error) {
      setLoading(false);
      createAlert("Error getting pre-signed URL", "error");
      console.error("Error getting pre-signed URL:", error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    if (url && file) {
      try {
        const result = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        console.log(result);
        setLoading(false);
        createAlert("File uploaded successfully", "success");
      } catch (error) {
        setLoading(false);
        createAlert("Error while uploading the file", "error");
        console.log(error);
      }
    } else {
      createAlert("No file selected", "warning");
      setLoading(false);
    }
  };

  const copyFileName = () => {
    if (fileName) {
      navigator.clipboard.writeText(fileName);
      createAlert("File name copied to clipboard", "info");
    }
  };

  return (
    <Stack direction="column" spacing={2} mt={5} alignItems="center">
      <input onChange={handleChange} type="file" />
      <Button disabled={loading} onClick={getPresignedUrl} variant="outlined">
        Get Pre-signed URL
      </Button>
      <Button disabled={loading} onClick={handleClick} variant="contained">
        Upload
      </Button>

      {!loading && fileName && (
        <Box mt={2}>
          <Button variant="outlined" onClick={copyFileName}>
            Copy File Name
          </Button>
          <Typography variant="body1">File Name: {fileName}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default UploadImage;
