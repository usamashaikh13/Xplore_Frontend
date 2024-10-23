import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, FormControl, Select, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReserveSlotPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewers, setInterviewers] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState('');
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  useEffect(() => {
    // Fetch candidates, interviewers, and available slots from the server or API
    // For demonstration, using static data
    setCandidates(['Amit Sharma', 'Priya Singh', 'Rahul Verma']);
    setDates(['2024-10-22', '2024-10-23', '2024-10-24']);
    setTimes(['10:00 AM', '11:00 AM', '02:00 PM']);
    setInterviewers([
      { name: 'Ravi Kumar', experience: '5 years' },
      { name: 'Anjali Mehta', experience: '3 years' },
      { name: 'Suresh Patil', experience: '7 years' },
    ]);
  }, []);

  const handleSchedule = () => {
    if (selectedCandidate && selectedDate && selectedTime && selectedInterviewer) {
      const newInterview = {
        candidate: selectedCandidate,
        date: selectedDate,
        time: selectedTime,
        interviewer: selectedInterviewer,
      };
      setScheduledInterviews([...scheduledInterviews, newInterview]);
      // Reset selections
      setSelectedCandidate('');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedInterviewer('');
    } else {
      alert('Please select a candidate, date, time, and interviewer.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Reserve Slot
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <Typography variant="subtitle1">Candidate</Typography>
          <Select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            {candidates.map((candidate) => (
              <MenuItem key={candidate} value={candidate}>
                {candidate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="subtitle1">Date</Typography>
          <Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="subtitle1">Time</Typography>
          <Select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            {times.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="subtitle1">Interviewer</Typography>
          <Select
            value={selectedInterviewer}
            onChange={(e) => setSelectedInterviewer(e.target.value)}
          >
            {interviewers.map((interviewer) => (
              <MenuItem key={interviewer.name} value={interviewer.name}>
                {interviewer.name} ({interviewer.experience})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleSchedule}>
        Schedule Interview
      </Button>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Scheduled Interviews
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Interviewer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduledInterviews.map((interview, index) => (
                <TableRow key={index}>
                  <TableCell>{interview.candidate}</TableCell>
                  <TableCell>{interview.date}</TableCell>
                  <TableCell>{interview.time}</TableCell>
                  <TableCell>{interview.interviewer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReserveSlotPage;
