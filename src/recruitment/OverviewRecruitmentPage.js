import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewRecruitmentPage = () => {
  const totalCandidates = 100;
  const notMappedCandidates = 20;
  const readyForInterviewCandidates = 30;
  const bookedCandidates = 25;
  const pendingCandidates = 25;

  const data = {
    labels: ['Not Mapped', 'Ready for Interview', 'Booked', 'Pending'],
    datasets: [
      {
        data: [notMappedCandidates, readyForInterviewCandidates, bookedCandidates, pendingCandidates],
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
        hoverBackgroundColor: ['#ff6666', '#3399ff', '#66ff66', '#ff9966'],
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

  return (
    <Box sx={{ width: '100%', height: '400px', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Recruitment Overview
      </Typography>
      <Pie data={data} options={options} />
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6">Total Candidates: {totalCandidates}</Typography>
        <Typography>Not Mapped: {notMappedCandidates}</Typography>
        <Typography>Ready for Interview: {readyForInterviewCandidates}</Typography>
        <Typography>Booked: {bookedCandidates}</Typography>
        <Typography>Pending: {pendingCandidates}</Typography>
      </Box>
    </Box>
  );
};

export default OverviewRecruitmentPage;
