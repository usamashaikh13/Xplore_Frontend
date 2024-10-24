import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewRecruitmentPage = () => {
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
          '#43A047',
          '#FB8C00',
          '#8E24AA',
          '#FFB300',
          '#388E3C',
          '#FFB300',
          '#FFD700',
          '#E53935',
        ],
        hoverBackgroundColor: [
          '#66BB6A',
          '#FFB74D',
          '#BA68C8',
          '#FFD54F',
          '#66BB6A',
          '#FFD54F',
          '#FFEB3B',
          '#EF5350',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
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
    { title: 'Total Candidates', value: totalCandidates, icon: <GroupIcon />, color: '#1E88E5' },
    { title: 'Total Scheduled Candidates', value: totalScheduledCandidates, icon: <CalendarTodayIcon />, color: '#43A047' },
    { title: 'Total Pending Candidates', value: totalPendingCandidates, icon: <HourglassEmptyIcon />, color: '#FB8C00' },
    { title: 'L1 Scheduled Candidates', value: l1ScheduledCandidates, icon: <CalendarTodayIcon />, color: '#8E24AA' },
    { title: 'L1 Pending Candidates', value: l1PendingCandidates, icon: <HourglassEmptyIcon />, color: '#FFB300' },
    { title: 'L2 Scheduled Candidates', value: l2ScheduledCandidates, icon: <CalendarTodayIcon />, color: '#388E3C' },
    { title: 'L2 Pending Candidates', value: l2PendingCandidates, icon: <HourglassEmptyIcon />, color: '#FFB300' },
    { title: 'Selected Candidates', value: selectedCandidates, icon: <CheckCircleIcon />, color: '#FFD700' },
    { title: 'Rejected Candidates', value: rejectedCandidates, icon: <CancelIcon />, color: '#E53935' },
  ];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Recruitment Overview
        </Typography>
        <IconButton color="primary" onClick={() => window.location.reload()}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                backgroundColor: card.color,
                color: 'white',
                transition: 'transform 0.3s, box-shadow 0.3s',
                transform: loaded ? 'scale(1)' : 'scale(0.9)',
                boxShadow: loaded ? 6 : 0,
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.icon} {card.title}
                </Typography>
                <Typography variant="h4">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: '100%', height: '400px', marginTop: '20px' }}>
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default OverviewRecruitmentPage;
