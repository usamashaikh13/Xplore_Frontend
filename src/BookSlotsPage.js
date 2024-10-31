import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMinutes from 'date-fns/addMinutes';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast, ToastContainer } from 'react-toastify'; // Include ToastContainer for toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import './BookSlotsPage.css'; // Import custom CSS for additional styling

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Function to generate time slots based on selected duration
const generateTimeSlots = (duration, bookedSlots, selectedDate) => {
  let start = 9 * 60; // Start at 9:00 AM
  const end = 18 * 60; // End at 6:00 PM
  const slots = [];

  while (start < end) {
    const hour = String(Math.floor(start / 60)).padStart(2, '0');
    const minute = String(start % 60).padStart(2, '0');
    const time = `${hour}:${minute}`;
    const isBooked = bookedSlots.some(slot => slot.date === format(selectedDate, 'yyyy-MM-dd') && slot.time === time);
    
    if (!isBooked) {
      slots.push(time);
    }
    start += duration; // Increment by duration (30, 45, or 60 mins)
  }

  return slots;
};

const BookedSlotCard = ({ slot }) => (
  <Card sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
      Date: {slot.date}
    </Typography>
    <Typography variant="body2">Start Time: {slot.time}</Typography>
    <Typography variant="body2">End Time: {slot.endTime}</Typography>
  </Card>
);

const BookSlotsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [slotDuration, setSlotDuration] = useState(30);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const savedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];
    setBookedSlots(savedSlots);
    setLoading(false);

    // Request notification permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBookSlot = () => {
    if (!selectedDate || selectedTimes.length === 0) {
      toast.error("Please select a valid date and at least one time slot.");
      return;
    }

    const now = new Date();
    if (selectedDate < now) {
      toast.error("You cannot book slots in the past.");
      return;
    }

    const newBookings = selectedTimes.map((time) => ({
      date: format(selectedDate, 'yyyy-MM-dd'),
      time,
      duration: slotDuration,
      endTime: format(addMinutes(new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${time}`), slotDuration), 'HH:mm'),
    }));

    const isConflict = newBookings.some(newSlot =>
      bookedSlots.some(slot => slot.date === newSlot.date && slot.time === newSlot.time)
    );

    if (isConflict) {
      toast.error("Some of the selected time slots are already booked. Please choose different times.");
      return;
    }

    setBookedSlots((prev) => [...prev, ...newBookings]);
    setSelectedTimes([]);
    toast.success("Slots booked successfully!");

    // Send notification
    newBookings.forEach(booking => {
      new Notification('Slot Booked', {
        body: `Your slot on ${booking.date} from ${booking.time} to ${booking.endTime} has been booked.`,
      });
    });
  };

  const eventPropGetter = (event) => {
    const now = new Date();
    const eventDate = new Date(`${event.date}T${event.time}`);
    
    if (eventDate < now) {
      return { style: { backgroundColor: '#e57373', color: 'white' }}; // Red for past events
    } else if (event.isBooked) {
      return { style: { backgroundColor: '#90caf9', color: 'white' }}; // Blue for booked slots
    }
    return { style: { backgroundColor: '#4caf50', color: 'white' }}; // Green for available slots
  };

  return (
    <Box sx={{ backgroundColor: '#f3f4f6', p: 4, minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
            <Box sx={{ backgroundColor: '#1976d2', p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Interview Booking Calendar
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Calendar
                localizer={localizer}
                events={bookedSlots.map((slot) => ({
                  title: `Booked`,
                  start: new Date(`${slot.date}T${slot.time}`),
                  end: new Date(`${slot.date}T${slot.endTime}`),
                  date: slot.date,
                  time: slot.time,
                }))}
                startAccessor="start"
                endAccessor="end"
                selectable
                views={['month', 'week', 'day']}
                style={{ height: '500px', borderRadius: '12px', boxShadow: 2 }}
                eventPropGetter={eventPropGetter}
                onSelectSlot={({ start }) => handleDateSelect(start)}
              />
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Legend</Typography>
                <Typography variant="body2" sx={{ color: '#e57373' }}>🟥 Past Booked Slots</Typography>
                <Typography variant="body2" sx={{ color: '#90caf9' }}>🟦 Future Booked Slots</Typography>
                <Typography variant="body2" sx={{ color: '#4caf50' }}>🟩 Available Slots</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Booking Form Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 3, backgroundColor: 'white' }}>
            <Box sx={{ backgroundColor: '#1976d2', p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Book a Slot
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#1976d2', fontWeight: 'bold' }}>
                Selected Date: {format(selectedDate, 'yyyy-MM-dd')}
              </Typography>

              {/* Slot Duration Select */}
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Slot Duration</InputLabel>
                  <Select
                    value={slotDuration}
                    onChange={(e) => {
                      setSlotDuration(e.target.value);
                      setSelectedTimes([]); // Clear selected times on duration change
                    }}
                    fullWidth
                  >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={45}>45 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Time Slot Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Select Time Slots</Typography>
                {generateTimeSlots(slotDuration, bookedSlots, selectedDate).map((time) => (
                  <Button
                    key={time}
                    variant={selectedTimes.includes(time) ? 'contained' : 'outlined'}
                    color="primary"
                    sx={{ m: 0.5 }}
                    onClick={() =>
                      setSelectedTimes((prev) =>
                        prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
                      )
                    }
                  >
                    {time}
                  </Button>
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, borderRadius: 5 }}
                onClick={handleBookSlot}
              >
                Book Slot
              </Button>
            </Box>
          </Card>

          {/* Booked Slots Section */}
          <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 3, backgroundColor: 'white' }}>
            <Box sx={{ backgroundColor: '#1976d2', p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Booked Slots
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {bookedSlots.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  No slots booked yet.
                </Typography>
              ) : (
                bookedSlots.map((slot, index) => (
                  <BookedSlotCard key={index} slot={slot} />
                ))
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default BookSlotsPage;
