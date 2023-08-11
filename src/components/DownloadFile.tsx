import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const DownloadFile = () => {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const onClick = async () => {
    try {
      const response = await axios.post(
        "https://aws-s3-pre-signed-url-generator.vercel.app/api/v1/download",
        {
          fileName,
        }
      );
      setDownloadUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewClick = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
    }
  };

  const viewPage = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  return (
    <Box mt={4} p={3} border="1px solid #ccc" borderRadius="8px">
      <TextField
        value={fileName}
        label="Enter File Name"
        variant="outlined"
        fullWidth
        onChange={onchange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ mt: 2 }}
      >
        Get URL
      </Button>
      {downloadUrl && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={onViewClick}
            sx={{ mr: 2 }}
          >
            Copy URL
          </Button>
          <Button variant="contained" color="info" onClick={viewPage}>
            View File
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DownloadFile;
