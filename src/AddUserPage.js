import React, { useState } from 'react';
import {
  TextField, Button, Paper, MenuItem, Select, InputLabel, FormControl, Box, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, ListItemText, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

const skills = [
  'SAP BASIS', 'SAP HANA', 'SAP ABAP', 'SAP Security', 'SAP FI/CO', 'SAP MM', 'SAP SD', 'SAP BW'
];

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]); 
  const [filterRole, setFilterRole] = useState(''); 

  const [openDialog, setOpenDialog] = useState(false);
  const [stageCategory, setStageCategory] = useState('');
  const [experienceCategory, setExperienceCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [errors, setErrors] = useState({});

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (!role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    if (validateForm()) {
      if (role === 'Interviewer') {
        setOpenDialog(true); 
      } else {
        const newUser = { name, email, password, role };
        setUsers([...users, newUser]);
        clearFields();
      }
    }
  };

  const handleConfirmInterviewer = () => {
    if (!stageCategory || !experienceCategory || selectedSkills.length === 0) {
      alert('Please fill out all fields for the interviewer.');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
      stageCategory,
      experienceCategory,
      skillSet: selectedSkills
    };
    setUsers([...users, newUser]); 
    setOpenDialog(false); 
    clearFields(); 
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setStageCategory('');
    setExperienceCategory('');
    setSelectedSkills([]);
    setErrors({});
  };

  const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;

  const handleSkillChange = (event) => {
    const { target: { value } } = event;
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Recruitment">Recruitment</MenuItem>
              <MenuItem value="Interviewer">Interviewer</MenuItem>
            </Select>
          </FormControl>
          {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
          <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mt: 2 }}>
            Add User
          </Button>
        </form>
      </Paper>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel>Filter by Role</InputLabel>
        <Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          label="Filter by Role"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
          <MenuItem value="Recruitment">Recruitment</MenuItem>
          <MenuItem value="Interviewer">Interviewer</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {filterRole === 'Interviewer' && (
                <>
                  <TableCell>Stage Category</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {user.role === 'Interviewer' && (
                  <>
                    <TableCell>{user.stageCategory}</TableCell>
                    <TableCell>{user.experienceCategory}</TableCell>
                    <TableCell>{user.skillSet.join(', ')}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Interviewer Details</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Stage Category</InputLabel>
            <Select
              value={stageCategory}
              onChange={(e) => setStageCategory(e.target.value)}
              label="Stage Category"
            >
              <MenuItem value="L1">L1</MenuItem>
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Experience Category"
              value={experienceCategory}
              onChange={(e) => setExperienceCategory(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Skill Set</InputLabel>
            <Select
              multiple
              value={selectedSkills}
              onChange={handleSkillChange}
              input={<OutlinedInput label="Skill Set" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  <Checkbox checked={selectedSkills.indexOf(skill) > -1} />
                  <ListItemText primary={skill} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmInterviewer} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUserPage;
