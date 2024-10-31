import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';
 
const data = [
  { id: 1, name: 'Amit Sharma', email: 'amit.sharma@example.com', phone: '9876543210', skills: ['SAP-BASIS Administration', 'SAP HANA', 'SAP NetWeaver'], experience: '7 years' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '8765432109', skills: ['SAP-BASIS Security', 'SAP Solution Manager', 'SAP S/4HANA'], experience: '5 years' },
  // Add more rows as needed
];
 
const additionalDetails = {
  1: { date: '2024-10-28', startTime: '10:00 AM', endTime: '11:00 AM', duration: '1 hour', interviewer: 'Ravi Kumar' },
  2: { date: '2024-10-29', startTime: '2:00 PM', endTime: '3:00 PM', duration: '1 hour', interviewer: 'Anjali Verma' },
  // Add more details as needed
};
 
const interviewerSlots = {
  'Ravi Kumar': [
    { date: '2024-10-28', startTime: '10:00 AM', endTime: '11:00 AM', duration: '1 hour' },
    { date: '2024-10-30', startTime: '1:00 PM', endTime: '2:00 PM', duration: '1 hour' },
    // Add more slots as needed
  ],
  'Anjali Verma': [
    { date: '2024-10-29', startTime: '2:00 PM', endTime: '3:00 PM', duration: '1 hour' },
    { date: '2024-11-01', startTime: '3:00 PM', endTime: '4:00 PM', duration: '1 hour' },
    // Add more slots as needed
  ],
  // Add more interviewers as needed
};
 
const FreeSlotPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
 
  const handleRowClick = (id) => {
    setSelectedRow(id);
    setOpenDialog(true);
  };
 
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
 
  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <EventAvailable fontSize="large" color="primary" />
        <Typography variant="h4" component="h1" ml={1}>
          Free Slots
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Skills</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Experience</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  {row.skills.map((skill, index) => (
                    <Chip key={index} label={skill} sx={{ marginRight: 1, marginBottom: 1 }} />
                  ))}
                </TableCell>
                <TableCell>{row.experience}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Interviewer Slots</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Interviewer: {additionalDetails[selectedRow].interviewer}</Typography>
            {interviewerSlots[additionalDetails[selectedRow].interviewer].map((slot, index) => (
              <Box key={index} mb={2}>
                <Typography>Date: {slot.date}</Typography>
                <Typography>Start Time: {slot.startTime}</Typography>
                <Typography>End Time: {slot.endTime}</Typography>
                <Typography>Duration: {slot.duration}</Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
 
export default FreeSlotPage;