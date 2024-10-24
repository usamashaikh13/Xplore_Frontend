import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem } from '@mui/material';

const ReserveSlotPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates from the server or API
    // For demonstration, using static data
    setCandidates([
      {
        dateTimeCreated: '2024-10-22 10:00 AM',
        name: 'Amit Sharma',
        email: 'amit.sharma@example.com',
        totalExperience: '5 years',
        relevantExperience: '3 years',
        skillset: ['SAP Basis', 'SAP ABAP'],
        l1Status: 'Scheduled',
        l1Interviewer: 'Ravi Kumar',
        l1Date: '2024-10-23',
        l1Time: '10:00 AM',
        l1Feedback: 'Pass',
      },
      {
        dateTimeCreated: '2024-10-23 11:00 AM',
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        totalExperience: '4 years',
        relevantExperience: '2 years',
        skillset: ['SAP FICO', 'SAP MM'],
        l1Status: 'Pending',
        l1Interviewer: 'Anjali Mehta',
        l1Date: '2024-10-24',
        l1Time: '11:00 AM',
        l1Feedback: 'No-Show',
      },
    ]);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = value;
    setCandidates(updatedCandidates);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return '#43A047'; // Green
      case 'Pending':
        return '#FB8C00'; // Orange
      case 'Completed':
        return '#1E88E5'; // Blue
      default:
        return '#000000'; // Black
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Candidate List
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400, borderRadius: '8px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date Time Created</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Experience</TableCell>
              <TableCell>Relevant Experience</TableCell>
              <TableCell>Skillset</TableCell>
              <TableCell>L1 Status</TableCell>
              <TableCell>L1 Interviewer</TableCell>
              <TableCell>L1 Date</TableCell>
              <TableCell>L1 Time</TableCell>
              <TableCell>L1 Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <TableCell>{candidate.dateTimeCreated}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.totalExperience}</TableCell>
                <TableCell>{candidate.relevantExperience}</TableCell>
                <TableCell>{candidate.skillset.join(', ')}</TableCell>
                <TableCell>
                  <Select
                    value={candidate.l1Status}
                    onChange={(e) => handleInputChange(index, 'l1Status', e.target.value)}
                    fullWidth
                    sx={{ color: getStatusColor(candidate.l1Status) }}
                  >
                    <MenuItem value="Scheduled" sx={{ color: '#43A047' }}>Scheduled</MenuItem>
                    <MenuItem value="Pending" sx={{ color: '#FB8C00' }}>Pending</MenuItem>
                    <MenuItem value="Completed" sx={{ color: '#1E88E5' }}>Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    value={candidate.l1Interviewer}
                    onChange={(e) => handleInputChange(index, 'l1Interviewer', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={candidate.l1Date}
                    onChange={(e) => handleInputChange(index, 'l1Date', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={candidate.l1Time}
                    onChange={(e) => handleInputChange(index, 'l1Time', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={candidate.l1Feedback}
                    onChange={(e) => handleInputChange(index, 'l1Feedback', e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Pass" sx={{ color: 'green' }}>Pass</MenuItem>
                    <MenuItem value="Fail" sx={{ color: 'red' }}>Fail</MenuItem>
                    <MenuItem value="No-Show" sx={{ color: 'orange' }}>No-Show</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReserveSlotPage;
