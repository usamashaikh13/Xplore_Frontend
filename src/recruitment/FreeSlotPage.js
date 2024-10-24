import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';

const FreeSlotPage = () => {
  const [freeSlots, setFreeSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});

  useEffect(() => {
    // Fetch free slots from the server or API
    // For demonstration, using static data
    const slots = [
      { interviewer: 'Ravi Kumar', email: 'ravi.kumar@ltimindtree.com', date: '2024-10-22', time: '10:00 AM', duration: '1 hour', skills: ['SAP Basis'], experience: '5 years', category: 'L1' },
      { interviewer: 'Anjali Mehta', email: 'anjali.mehta@ltimindtree.com', date: '2024-10-23', time: '11:00 AM', duration: '1 hour', skills: ['SAP ABAP'], experience: '3 years', category: 'L2' },
      { interviewer: 'Suresh Patil', email: 'suresh.patil@ltimindtree.com', date: '2024-10-24', time: '02:00 PM', duration: '1 hour', skills: ['SAP FICO'], experience: '7 years', category: 'Other' },
      { interviewer: 'Priya Singh', email: 'priya.singh@ltimindtree.com', date: '2024-10-25', time: '10:00 AM', duration: '1 hour', skills: ['SAP MM'], experience: '4 years', category: 'L1' },
      { interviewer: 'Rahul Verma', email: 'rahul.verma@ltimindtree.com', date: '2024-10-26', time: '11:00 AM', duration: '1 hour', skills: ['SAP SD'], experience: '6 years', category: 'L2' },
    ];
    setFreeSlots(slots);
    setFilteredSlots(slots);
  }, []);

  const handleFilterChange = () => {
    let filtered = freeSlots;
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(slot => selectedSkills.every(skill => slot.skills.includes(skill)));
    }
    if (selectedExperience) {
      filtered = filtered.filter(slot => slot.experience === selectedExperience);
    }
    if (selectedCategory) {
      filtered = filtered.filter(slot => slot.category === selectedCategory);
    }
    if (selectedMonth) {
      filtered = filtered.filter(slot => new Date(slot.date).getMonth() + 1 === parseInt(selectedMonth));
    }
    setFilteredSlots(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedSkills, selectedExperience, selectedCategory, selectedMonth]);

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedExperience('');
    setSelectedCategory('');
    setSelectedMonth('');
    setFilteredSlots(freeSlots);
  };

  const handleRowClick = (slot) => {
    setDialogData(slot);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Free Slots Overview
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Autocomplete
          multiple
          options={['SAP Basis', 'SAP ABAP', 'SAP FICO', 'SAP MM', 'SAP SD']}
          value={selectedSkills}
          onChange={(event, newValue) => setSelectedSkills(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Skills" placeholder="Select skills" />
          )}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Experience</InputLabel>
          <Select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="3 years">3 years</MenuItem>
            <MenuItem value="4 years">4 years</MenuItem>
            <MenuItem value="5 years">5 years</MenuItem>
            <MenuItem value="6 years">6 years</MenuItem>
            <MenuItem value="7 years">7 years</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">January</MenuItem>
            <MenuItem value="2">February</MenuItem>
            <MenuItem value="3">March</MenuItem>
            <MenuItem value="4">April</MenuItem>
            <MenuItem value="5">May</MenuItem>
            <MenuItem value="6">June</MenuItem>
            <MenuItem value="7">July</MenuItem>
            <MenuItem value="8">August</MenuItem>
            <MenuItem value="9">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={clearFilters}>
          <ClearIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Interviewer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSlots.map((slot, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }} onClick={() => handleRowClick(slot)}>
                <TableCell>{slot.interviewer}</TableCell>
                <TableCell>{slot.email}</TableCell>
                <TableCell>{slot.skills.join(', ')}</TableCell>
                <TableCell>{slot.experience}</TableCell>
                <TableCell>{slot.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Slot Details</DialogTitle>
        <DialogContent>
          <Typography>Date: {dialogData.date}</Typography>
          <Typography>Time: {dialogData.time}</Typography>
          <Typography>Duration: {dialogData.duration}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FreeSlotPage;
