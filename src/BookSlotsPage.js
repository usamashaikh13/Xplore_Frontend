import React, { useState } from 'react';
import { Box, Grid, MenuItem, Select, FormControl, InputLabel, TextField, Button, ListItemText, Checkbox, Typography, Card, CardContent, CardHeader } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewSlotsPage from './ViewSlotsPage';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ConfirmationDialog from './ConfirmationDialog';

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

const BookSlotsPage = ({ interviewerName }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [slotDuration, setSlotDuration] = useState(30);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [highlightedDate, setHighlightedDate] = useState(null);

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
  };

  const handleTimeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTimes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSlotDurationChange = (event) => {
    setSlotDuration(event.target.value);
  };

  const handleBookSlot = () => {
    if (!selectedDate) {
      toast.error('Please select a date.');
      return;
    }
    if (selectedTimes.length === 0) {
      toast.error('Please select at least one time slot.');
      return;
    }

    setDialogOpen(true);
  };

  const confirmBooking = () => {
    const slots = selectedTimes.map((time) => ({
      date: format(selectedDate, 'yyyy-MM-dd'),
      time,
      duration: slotDuration,
      interviewer: interviewerName,
    }));
    setBookedSlots([...bookedSlots, ...slots]);
    toast.success('Slot(s) booked successfully!');
    setSelectedDate(new Date());
    setSelectedTimes([]);
    setSlotDuration(30);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <ToastContainer />
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader
          avatar={<EventNoteIcon sx={{ color: 'blue', fontSize: 40 }} />}
          title="Book My Slot"
          titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}
          sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}
                onSelectSlot={(slotInfo) => handleDateChange(slotInfo.start)}
                selectable
                min={new Date()}
                dayPropGetter={(date) => ({
                  className: highlightedDate && date.toDateString() === highlightedDate.toDateString() ? 'highlight' : '',
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Selected Date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="time-slot-label">Select Time Slots</InputLabel>
                <Select
                  labelId="time-slot-label"
                  multiple
                  value={selectedTimes}
                  onChange={handleTimeChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      <Checkbox checked={selectedTimes.indexOf(time) > -1} />
                      <ListItemText primary={time} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="slot-duration-label">Slot Duration</InputLabel>
                <Select
                  labelId="slot-duration-label"
                  value={slotDuration}
                  onChange={handleSlotDurationChange}
                >
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={45}>45 minutes</MenuItem>
                  <MenuItem value={60}>60 minutes</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleBookSlot} sx={{ mt: 2 }}>
                Book Slot
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card elevation={3}>
        <CardHeader
          title="Booked Slots"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}
          sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
        />
        <CardContent>
          <ViewSlotsPage bookedSlots={bookedSlots} setBookedSlots={setBookedSlots} />
        </CardContent>
      </Card>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmBooking}
        selectedDate={selectedDate}
        selectedTimes={selectedTimes}
      />
    </Box>
  );
};

export default BookSlotsPage;
