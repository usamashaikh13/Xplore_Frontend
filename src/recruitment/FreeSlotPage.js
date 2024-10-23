import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FreeSlotPage = () => {
  const [freeSlots, setFreeSlots] = useState([]);

  const fetchFreeSlots = () => {
    // Fetch free slots from the server or API
    // For demonstration, using static data
    const slots = [
      { panel: 'Panel 1', date: '2024-10-22', time: '10:00 AM', duration: '1 hour' },
      { panel: 'Panel 2', date: '2024-10-23', time: '11:00 AM', duration: '1 hour' },
      { panel: 'Panel 3', date: '2024-10-24', time: '02:00 PM', duration: '1 hour' },
      { panel: 'Panel 1', date: '2024-10-25', time: '10:00 AM', duration: '1 hour' },
      { panel: 'Panel 2', date: '2024-10-26', time: '11:00 AM', duration: '1 hour' },
    ];
    setFreeSlots(slots);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Free Slots Overview
      </Typography>
      <Button variant="contained" onClick={fetchFreeSlots} sx={{ marginBottom: '20px' }}>
        Show Free Slots
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Panel</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeSlots.map((slot, index) => (
              <TableRow key={index}>
                <TableCell>{slot.panel}</TableCell>
                <TableCell>{slot.date}</TableCell>
                <TableCell>{slot.time}</TableCell>
                <TableCell>{slot.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FreeSlotPage;
