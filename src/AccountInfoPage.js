// AccountInfoPage.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AccountInfoPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Information
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Name: Akash Wagh</Typography>
        <Typography variant="h6">Designation: Principal - Package Implementation</Typography>
        <Typography variant="h6">Email: Akash.Wagh@LTIMindtree.com</Typography>
        <Typography variant="h6">Phone: +1234567890</Typography>
      </Paper>
      
    </Box>
  );
};

export default AccountInfoPage;
