import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './ReserveSlotPage.css';

const ReserveSlotPage = () => {
  const data = useMemo(() => [
    {
      dateTimeCreated: '2024-10-22 10:00 AM',
      name: 'Amit Sharma',
      email: 'amit.sharma@example.com',
      totalExperience: '5 years',
      relevantExperience: '3 years',
      skillset: ['SAP Basis', 'SAP ABAP'],
      l1Interviewer: 'Ravi Kumar',
      l1Date: '2024-10-23',
      l1Time: '10:00 AM',
    },
    // Add more candidates as needed
  ], []);

  const columns = useMemo(() => [
    { accessorKey: 'dateTimeCreated', header: 'Date Time Created' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'totalExperience', header: 'Total Experience' },
    { accessorKey: 'relevantExperience', header: 'Relevant Experience' },
    { accessorKey: 'skillset', header: 'Skillset', cell: info => info.getValue().join(', ') },
    { accessorKey: 'l1Interviewer', header: 'L1 Interviewer' },
    { accessorKey: 'l1Date', header: 'L1 Date' },
    { accessorKey: 'l1Time', header: 'L1 Time' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1565C0', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        Reserve Slot
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#fafafa' }}>
          <Table aria-label="reserve slot table" sx={{ minWidth: 650 }}>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} sx={{ backgroundColor: '#1976d2' }}>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      align="left"
                      sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '12px', whiteSpace: 'nowrap' }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:hover': { backgroundColor: '#e3f2fd', cursor: 'pointer' },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      align="left"
                      sx={{ fontSize: '0.95rem', color: '#424242', padding: '10px' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ReserveSlotPage;
