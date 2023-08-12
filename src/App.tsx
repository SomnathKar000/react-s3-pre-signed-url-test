import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import UploadImage from "./components/UploadImage";
import DownloadFile from "./components/DownloadFile";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState<{
    open: boolean;
    type: 'warning' | 'error' | 'info' | 'success';
    message: string;
  }>({
    open: false,
    type: "warning",
    message: "Enter your fileName",
  });

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const createAlert=(message:string,type:'error' | 'info' | 'success' | 'warning')=>{
    setAlert({
      open:true,
      type,
      message,
    })
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          AWS S3 Pre-Signed URL Generator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <UploadImage createAlert={createAlert}/>
          </Grid>
          <Grid item xs={6}>
            <DownloadFile createAlert={createAlert}/>
          </Grid>
        </Grid>
        <Alert {...alert} handleClose={handleCloseAlert} />
      </div>
    </Container>
  );
}

export default App;
