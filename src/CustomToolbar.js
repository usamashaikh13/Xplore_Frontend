import React from 'react';
import { Toolbar, Button, Box, Typography } from '@mui/material';

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };
  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        {toolbar.label}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button
          onClick={goToBack}
          variant="contained"
          color="primary"
          sx={{ px: 3, borderRadius: 2 }}
        >
          Back
        </Button>
        <Button
          onClick={goToCurrent}
          variant="contained"
          color="secondary"
          sx={{ px: 3, borderRadius: 2 }}
        >
          Today
        </Button>
        <Button
          onClick={goToNext}
          variant="contained"
          color="primary"
          sx={{ px: 3, borderRadius: 2 }}
        >
          Next
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          onClick={() => toolbar.onView('month')}
          variant="text"
          color="primary"
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          Month
        </Button>
        <Button
          onClick={() => toolbar.onView('week')}
          variant="text"
          color="primary"
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          Week
        </Button>
        <Button
          onClick={() => toolbar.onView('day')}
          variant="text"
          color="primary"
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          Day
        </Button>
        <Button
          onClick={() => toolbar.onView('agenda')}
          variant="text"
          color="primary"
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          Agenda
        </Button>
      </Box>
    </Box>
  );
};

export default CustomToolbar;
