import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';

const ViewSlotsPage = ({ bookedSlots = [], setBookedSlots }) => {
  const [open, setOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  const handleClickOpen = (slot) => {
    setSlotToDelete(slot);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSlotToDelete(null);
  };

  const handleDelete = () => {
    setBookedSlots(bookedSlots.filter(slot => slot !== slotToDelete));
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="booked slots table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Interviewer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedSlots.length > 0 ? (
              bookedSlots.map((slot, index) => {
                const startTime = new Date(`${slot.date}T${slot.time}`);
                const endTime = addMinutes(startTime, slot.duration);
                return (
                  <TableRow key={index}>
                    <TableCell>{slot.date}</TableCell>
                    <TableCell>{format(startTime, 'HH:mm')}</TableCell>
                    <TableCell>{format(endTime, 'HH:mm')}</TableCell>
                    <TableCell>{slot.duration} minutes</TableCell>
                    <TableCell>{slot.interviewer}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpen(slot)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No slots booked.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this slot?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewSlotsPage;
