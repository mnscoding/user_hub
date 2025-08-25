import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Alert,
  TableContainer,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    gender: "",
    hobby: "",
    skill_level: "",
    short_bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUsers(res.data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || "Failed to fetch users.");
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleEditClick = (user) => {
    if (user.id === loggedInUser.id) {
      setSelectedUser(user);
      setEditForm({
        name: user.name,
        email: user.email,
        gender: user.gender,
        hobby: user.hobby,
        skill_level: user.skill_level,
        short_bio: user.short_bio,
      });
      setEditDialogOpen(true);
    }
  };

  const handleDeleteClick = (user) => {
    if (user.id === loggedInUser.id) {
      setSelectedUser(user);
      setDeleteDialogOpen(true);
    }
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/users/${selectedUser.id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setEditDialogOpen(false);

      const usersRes = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(usersRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/users/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setDeleteDialogOpen(false);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete user.");
      setDeleteDialogOpen(false);
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSuccess("");
    setError("");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          mb: 4,
          fontWeight: 600,
          fontFamily: "Roboto, sans-serif",
          color: "#1976d2",
        }}
      >
        User List
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2, fontFamily: "Roboto, sans-serif", fontWeight: 500 }}
          onClose={handleCloseSnackbar}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2, fontFamily: "Roboto, sans-serif", fontWeight: 500 }}
          onClose={handleCloseSnackbar}
        >
          {success}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "Name",
                "Email",
                "Gender",
                "Hobby",
                "Skill Level",
                "Short Bio",
                "Joined",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell sx={{ fontFamily: "Roboto, sans-serif" }}>
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    maxWidth: 200,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell sx={{ fontFamily: "Roboto, sans-serif" }}>
                  {user.gender}
                </TableCell>
                <TableCell sx={{ fontFamily: "Roboto, sans-serif" }}>
                  {user.hobby}
                </TableCell>
                <TableCell sx={{ fontFamily: "Roboto, sans-serif" }}>
                  {user.skill_level}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    maxWidth: 250,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {user.short_bio}
                </TableCell>
                <TableCell sx={{ fontFamily: "Roboto, sans-serif" }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {user.id === loggedInUser?.id && (
                    <Box>
                      <IconButton
                        color="grey"
                        onClick={() => handleEditClick(user)}
                        size="small"
                        disabled={loading || isDeleting}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="grey"
                        onClick={() => handleDeleteClick(user)}
                        size="small"
                        disabled={loading || isDeleting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => !loading && setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.name}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editForm.email}
            onChange={handleInputChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            select
            fullWidth
            variant="outlined"
            value={editForm.gender}
            onChange={handleInputChange}
            disabled={loading}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="hobby"
            label="Hobby"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.hobby}
            onChange={handleInputChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="skill_level"
            label="Skill Level"
            select
            fullWidth
            variant="outlined"
            value={editForm.skill_level}
            onChange={handleInputChange}
            disabled={loading}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="short_bio"
            label="Short Bio"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={editForm.short_bio}
            onChange={handleInputChange}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone and you will not be able to log in again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!success || !!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={success || error}
      />
    </Container>
  );
};

export default UserList;
