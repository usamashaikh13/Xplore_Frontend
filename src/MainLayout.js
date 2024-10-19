import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Avatar, Divider } from '@mui/material';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import AddUserPage from './AddUserPage';
import AdminOverviewPage from './AdminOverviewPage';
import OverviewPage from './OverviewPage';
import BookSlotsPage from './BookSlotsPage';
import ViewSlotsPage from './ViewSlotsPage';
import AccountInfoPage from './AccountInfoPage';
import UploadProfilesPage from './UploadProfilesPage'; // New import
import DownloadReportsPage from './DownloadReportsPage'; // New import

const drawerWidth = 240;

const MainLayout = ({ onLogout, user, users, setUsers }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar>
            <Avatar alt="App Logo" src="/path/to/logo.png" sx={{ margin: '0 auto', width: 56, height: 56 }} />
          </Toolbar>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {/* Admin specific links */}
              {user.role === 'admin' && (
                <>
                  <ListItem button component={Link} to="/add-user">
                    <ListItemText primary="Add User" />
                  </ListItem>
                  <ListItem button component={Link} to="/admin-overview">
                    <ListItemText primary="Admin Overview" />
                  </ListItem>
                  <ListItem button component={Link} to="/upload-profiles">
                    <ListItemText primary="Upload Profiles" />
                  </ListItem>
                  <ListItem button component={Link} to="/download-reports">
                    <ListItemText primary="Download Reports" />
                  </ListItem>
                </>
              )}
              {/* Interviewer specific links */}
              {user.role === 'interviewer' && (
                <>
                  <ListItem button component={Link} to="/overview">
                    <ListItemText primary="Overview" />
                  </ListItem>
                  <ListItem button component={Link} to="/book-slots">
                    <ListItemText primary="Book My Slots" />
                  </ListItem>
                  <ListItem button component={Link} to="/view-slots">
                    <ListItemText primary="View My Slots" />
                  </ListItem>
                  <ListItem button component={Link} to="/account-info">
                    <ListItemText primary="Account Info" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                XploRE
              </Typography>
              <Button color="inherit" onClick={onLogout} sx={{ marginLeft: 'auto' }}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Navigate to={user.role === 'admin' ? '/admin-overview' : '/overview'} />} />
            {user.role === 'admin' && (
              <>
                <Route path="/add-user" element={<AddUserPage users={users} setUsers={setUsers} />} />
                <Route path="/admin-overview" element={<AdminOverviewPage users={users} setUsers={setUsers} />} />
                <Route path="/upload-profiles" element={<UploadProfilesPage />} /> {/* New route */}
                <Route path="/download-reports" element={<DownloadReportsPage />} /> {/* New route */}
              </>
            )}
            {user.role === 'interviewer' && (
              <>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/book-slots" element={<BookSlotsPage />} />
                <Route path="/view-slots" element={<ViewSlotsPage />} />
                <Route path="/account-info" element={<AccountInfoPage />} />
              </>
            )}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
