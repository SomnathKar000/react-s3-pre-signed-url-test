import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const DownloadFile = (props: {
  createAlert: (
    message: string,
    type: "error" | "info" | "success" | "warning"
  ) => void;
}) => {
  const { createAlert } = props;
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
      createAlert("Successfully generated pre-signed URL", "success");
    } catch (error) {
      createAlert("Error getting pre-signed URL", "error");
      console.log(error);
    }
  };

  const onCopyClick = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
    }
  };

  const viewPage = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  const clearFields = () => {
    setFileName("");
    setDownloadUrl("");
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
            onClick={onCopyClick}
            sx={{ mr: 2 }}
          >
            Copy URL
          </Button>
          <Button variant="contained" color="info" onClick={viewPage}>
            View File
          </Button>
          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="error"
            onClick={clearFields}
          >
            Clear Fields
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DownloadFile;
