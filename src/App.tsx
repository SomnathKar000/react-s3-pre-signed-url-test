import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import UploadImage from "./components/UploadImage";
import DownloadFile from "./components/DownloadFile";

function App() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          AWS S3 Pre-Signed URL Generator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <UploadImage />
          </Grid>
          <Grid item xs={6}>
            <DownloadFile />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default App;
