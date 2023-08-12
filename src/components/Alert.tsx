import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Box} from '@mui/material';

const AlertComponent = (props:{
    open:boolean,
    type: 'error' | 'info' | 'success' | 'warning',
    message:string,
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void,
}) => {
const {open,type,message,handleClose}=props

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AlertComponent
