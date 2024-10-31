import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Backdrop,
} from '@mui/material';
import {
  Dashboard,
  PersonAdd,
  CloudUpload,
  CloudDownload,
  Event,
  AccountCircle,
  ExitToApp,
  Menu,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import AddUserPage from './AddUserPage';
import AdminOverviewPage from './AdminOverviewPage';
import OverviewPage from './OverviewPage';
import OverviewRecruitmentPage from './recruitment/OverviewRecruitmentPage';
import BookSlotsPage from './BookSlotsPage';
import ViewSlotsPage from './ViewSlotsPage';
import AccountInfoPage from './AccountInfoPage';
import UploadProfilesPage from './UploadProfilesPage';
import DownloadReportsPage from './DownloadReportsPage';
import ReserveSlotPage from './recruitment/ReserveSlotPage';
import FreeSlotPage from './recruitment/FreeSlotPage';
import BookedSlotPage from './recruitment/BookedSlotPage';
import RequestSlotPage from './recruitment/RequestSlotPage';

const drawerWidth = 240;

const MainLayout = ({ onLogout, user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#003366' : '#00509e' }, // Dark blue for dark mode, corporate blue for light mode
      secondary: { main: darkMode ? '#ffb74d' : '#ff9800' }, // Complementary orange
      background: { default: darkMode ? '#121212' : '#f4f4f9' },
      text: { primary: darkMode ? '#e0e0e0' : '#2e2e2e' },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: drawerWidth,
            backgroundColor: darkMode ? '#1a1a1a' : '#e8eaf6',
            color: darkMode ? '#ffffff' : '#2e2e2e',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: darkMode ? '#003366' : '#00509e',
          },
        },
      },
    },
  });

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Avatar alt="App Logo" src="/path/to/logo.png" sx={{ width: 60, height: 60 }} />
      </Toolbar>
      <Divider sx={{ my: 1 }} />
      <List>
        {user.role === 'admin' && (
          <>
            <ListItem button component={Link} to="/admin-overview" onClick={closeDrawer}>
              <Tooltip title="Admin Overview" placement="right">
                <IconButton color="primary"><Dashboard /></IconButton>
              </Tooltip>
              <Typography variant="body1">Admin Overview</Typography>
            </ListItem>
            <ListItem button component={Link} to="/add-user" onClick={closeDrawer}>
              <Tooltip title="Add User" placement="right">
                <IconButton color="primary"><PersonAdd /></IconButton>
              </Tooltip>
              <Typography variant="body1">Add User</Typography>
            </ListItem>
            <ListItem button component={Link} to="/upload-profiles" onClick={closeDrawer}>
              <Tooltip title="Upload Profiles" placement="right">
                <IconButton color="primary"><CloudUpload /></IconButton>
              </Tooltip>
              <Typography variant="body1">Upload Profiles</Typography>
            </ListItem>
            <ListItem button component={Link} to="/download-reports" onClick={closeDrawer}>
              <Tooltip title="Download Reports" placement="right">
                <IconButton color="primary"><CloudDownload /></IconButton>
              </Tooltip>
              <Typography variant="body1">Download Reports</Typography>
            </ListItem>
          </>
        )}
        {user.role === 'interviewer' && (
          <>
            <ListItem button component={Link} to="/interviewer-overview" onClick={closeDrawer}>
              <Tooltip title="Overview" placement="right">
                <IconButton color="primary"><Dashboard /></IconButton>
              </Tooltip>
              <Typography variant="body1">Overview</Typography>
            </ListItem>
            <ListItem button component={Link} to="/book-slots" onClick={closeDrawer}>
              <Tooltip title="Book My Slots" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">Book My Slots</Typography>
            </ListItem>
            <ListItem button component={Link} to="/view-slots" onClick={closeDrawer}>
              <Tooltip title="View My Slots" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">View My Slots</Typography>
            </ListItem>
            <ListItem button component={Link} to="/account-info" onClick={closeDrawer}>
              <Tooltip title="Account Info" placement="right">
                <IconButton color="primary"><AccountCircle /></IconButton>
              </Tooltip>
              <Typography variant="body1">Account Info</Typography>
            </ListItem>
          </>
        )}
        {user.role === 'recruiter' && (
          <>
            <ListItem button component={Link} to="/recruiter-overview" onClick={closeDrawer}>
              <Tooltip title="Overview" placement="right">
                <IconButton color="primary"><Dashboard /></IconButton>
              </Tooltip>
              <Typography variant="body1">Overview</Typography>
            </ListItem>
            <ListItem button component={Link} to="/reserve-slot" onClick={closeDrawer}>
              <Tooltip title="Reserve Slot" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">Reserve Slot</Typography>
            </ListItem>
            <ListItem button component={Link} to="/free-slot" onClick={closeDrawer}>
              <Tooltip title="Free Slot" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">Free Slot</Typography>
            </ListItem>
            <ListItem button component={Link} to="/booked-slot" onClick={closeDrawer}>
              <Tooltip title="Booked Slot" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">Booked Slot</Typography>
            </ListItem>
            <ListItem button component={Link} to="/request-slot" onClick={closeDrawer}>
              <Tooltip title="Request Slot" placement="right">
                <IconButton color="primary"><Event /></IconButton>
              </Tooltip>
              <Typography variant="body1">Request Slot</Typography>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: theme.palette.primary.main }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              XploRE
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button color="secondary" variant="contained" onClick={onLogout} startIcon={<ExitToApp />}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          onClose={closeDrawer}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Backdrop open={drawerOpen} onClick={closeDrawer} sx={{ zIndex: theme.zIndex.drawer - 1 }} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
          <Toolbar />
          <Routes>
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/admin-overview" element={<AdminOverviewPage />} />
            <Route path="/interviewer-overview" element={<OverviewPage />} />
            <Route path="/recruiter-overview" element={<OverviewRecruitmentPage />} />
            <Route path="/book-slots" element={<BookSlotsPage />} />
            <Route path="/view-slots" element={<ViewSlotsPage />} />
            <Route path="/account-info" element={<AccountInfoPage />} />
            <Route path="/upload-profiles" element={<UploadProfilesPage />} />
            <Route path="/download-reports" element={<DownloadReportsPage />} />
            <Route path="/reserve-slot" element={<ReserveSlotPage />} />
            <Route path="/free-slot" element={<FreeSlotPage />} />
            <Route path="/booked-slot" element={<BookedSlotPage />} />
            <Route path="/request-slot" element={<RequestSlotPage />} />
            <Route path="*" element={<Navigate to={user.role === 'admin' ? '/admin-overview' : '/'} />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
