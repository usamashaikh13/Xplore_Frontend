import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminOverviewPage = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [editedData, setEditedData] = useState({ name: '', email: '', role: '' }); // Track edited data
  const [editIndex, setEditIndex] = useState(null); // Store the index of the user being edited

  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setEditingUser(userToEdit);
    setEditedData(userToEdit); // Prefill the form with the user's existing data
    setEditIndex(index);
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = editedData; // Update the specific user in the list
    setUsers(updatedUsers);
    handleClose(); // Close the dialog after saving
  };

  const handleClose = () => {
    setEditingUser(null);
    setEditIndex(null);
    setEditedData({ name: '', email: '', role: '' });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for editing user */}
      {editingUser && (
        <Dialog open={Boolean(editingUser)} onClose={handleClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={editedData.email}
              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              value={editedData.role}
              onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AdminOverviewPage;
