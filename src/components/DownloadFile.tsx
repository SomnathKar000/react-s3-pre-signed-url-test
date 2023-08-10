import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";

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
    <Box>
      <TextField
        value={fileName}
        label="Outlined"
        onChange={onchange}
        variant="outlined"
      />
      <Button variant="contained" color="success" onClick={onClick}>
        Get Url
      </Button>
      {downloadUrl && (
        <Box>
          <Button variant="contained" color="success" onClick={onViewClick}>
            Copy
          </Button>
          <Button variant="contained" color="warning" onClick={viewPage}>
            View
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DownloadFile;
