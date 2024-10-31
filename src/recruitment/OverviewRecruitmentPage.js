import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewRecruitmentPage = () => {
  const theme = useTheme();

  const totalCandidates = 100;
  const totalScheduledCandidates = 50;
  const totalPendingCandidates = 25;
  const l1ScheduledCandidates = 15;
  const l1PendingCandidates = 10;
  const l2ScheduledCandidates = 10;
  const l2PendingCandidates = 5;
  const selectedCandidates = 20;
  const rejectedCandidates = 15;

  const data = {
    labels: [
      'Total Scheduled Candidates',
      'Total Pending Candidates',
      'L1 Scheduled Candidates',
      'L1 Pending Candidates',
      'L2 Scheduled Candidates',
      'L2 Pending Candidates',
      'Selected Candidates',
      'Rejected Candidates',
    ],
    datasets: [
      {
        data: [
          totalScheduledCandidates,
          totalPendingCandidates,
          l1ScheduledCandidates,
          l1PendingCandidates,
          l2ScheduledCandidates,
          l2PendingCandidates,
          selectedCandidates,
          rejectedCandidates,
        ],
        backgroundColor: [
          '#4caf50', // Green
          '#ff9800', // Orange
          '#9c27b0', // Purple
          '#ffeb3b', // Yellow
          '#3f51b5', // Indigo
          '#00bcd4', // Cyan
          '#8bc34a', // Light Green
          '#f44336', // Red
        ],
        hoverBackgroundColor: [
          '#66bb6a',
          '#ffb74d',
          '#ba68c8',
          '#fff176',
          '#5c6bc0',
          '#4dd0e1',
          '#aed581',
          '#ef5350',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Total Candidates: ${totalCandidates}`,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const cards = [
    { title: 'Total Candidates', value: totalCandidates, icon: <GroupIcon fontSize="medium" />, color: '#1E88E5' },
    { title: 'Total Scheduled Candidates', value: totalScheduledCandidates, icon: <CalendarTodayIcon fontSize="medium" />, color: '#43A047' },
    { title: 'Total Pending Candidates', value: totalPendingCandidates, icon: <HourglassEmptyIcon fontSize="medium" />, color: '#FB8C00' },
    { title: 'L1 Scheduled Candidates', value: l1ScheduledCandidates, icon: <CalendarTodayIcon fontSize="medium" />, color: '#8E24AA' },
    { title: 'L1 Pending Candidates', value: l1PendingCandidates, icon: <HourglassEmptyIcon fontSize="medium" />, color: '#FFB300' },
    { title: 'L2 Scheduled Candidates', value: l2ScheduledCandidates, icon: <CalendarTodayIcon fontSize="medium" />, color: '#388E3C' },
    { title: 'L2 Pending Candidates', value: l2PendingCandidates, icon: <HourglassEmptyIcon fontSize="medium" />, color: '#FFB300' },
    { title: 'Selected Candidates', value: selectedCandidates, icon: <CheckCircleIcon fontSize="medium" />, color: '#FFD700' },
    { title: 'Rejected Candidates', value: rejectedCandidates, icon: <CancelIcon fontSize="medium" />, color: '#E53935' },
  ];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box sx={{ width: '100%', padding: '20px', backgroundColor: theme.palette.background.default }}>
      <Box sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white, padding: '10px', borderRadius: '4px', marginBottom: '20px', position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Recruitment Overview
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ width: '100%', height: '400px' }}>
            <Pie data={data} options={options} />
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: card.color,
                    color: 'white',
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: loaded ? 'scale(1)' : 'scale(0.9)',
                    boxShadow: loaded ? 6 : 0,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      {card.icon}
                      <Typography variant="body1" component="div">
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewRecruitmentPage;
