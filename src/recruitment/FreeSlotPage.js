import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { EventAvailable, Close } from '@mui/icons-material';

const data = [
  { id: 1, name: 'Amit Sharma', email: 'amit.sharma@example.com', phone: '9876543210', skills: ['SAP-BASIS Administration', 'SAP HANA', 'SAP NetWeaver'], experience: '7 years' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '8765432109', skills: ['SAP-BASIS Security', 'SAP Solution Manager', 'SAP S/4HANA'], experience: '5 years' },
];

const additionalDetails = {
  1: { date: '2024-10-28', startTime: '10:00 AM', endTime: '11:00 AM', duration: '1 hour', interviewer: 'Ravi Kumar' },
  2: { date: '2024-10-29', startTime: '2:00 PM', endTime: '3:00 PM', duration: '1 hour', interviewer: 'Anjali Verma' },
};

const interviewerSlots = {
  'Ravi Kumar': [
    { date: '2024-10-28', startTime: '10:00 AM', endTime: '11:00 AM', duration: '1 hour' },
    { date: '2024-10-30', startTime: '1:00 PM', endTime: '2:00 PM', duration: '1 hour' },
  ],
  'Anjali Verma': [
    { date: '2024-10-29', startTime: '2:00 PM', endTime: '3:00 PM', duration: '1 hour' },
    { date: '2024-11-01', startTime: '3:00 PM', endTime: '4:00 PM', duration: '1 hour' },
  ],
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
    <Box p={4} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <EventAvailable fontSize="large" color="primary" />
        <Typography variant="h4" component="h1" ml={2} sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Available Free Slots
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Skills</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Experience</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f7ff' },
                  transition: 'background-color 0.3s',
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  {row.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        marginRight: 1,
                        marginBottom: 1,
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell>{row.experience}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            Interviewer Slots
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Interviewer: {additionalDetails[selectedRow].interviewer}
            </Typography>
            {interviewerSlots[additionalDetails[selectedRow].interviewer].map((slot, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  my: 1,
                  backgroundColor: '#f0f4c3',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography><strong>Date:</strong> {slot.date}</Typography>
                <Typography><strong>Start Time:</strong> {slot.startTime}</Typography>
                <Typography><strong>End Time:</strong> {slot.endTime}</Typography>
                <Typography><strong>Duration:</strong> {slot.duration}</Typography>
              </Paper>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default FreeSlotPage;
