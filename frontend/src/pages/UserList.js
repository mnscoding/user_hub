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
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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

        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users.");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
      }
    };

    fetchUsers();
  }, [navigate]);

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
        >
          {error}
        </Alert>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
