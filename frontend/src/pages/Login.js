import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { BlinkBlur } from "react-loading-indicators";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/users");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          fontFamily: "Roboto, sans-serif",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#1976d2",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Login
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, fontFamily: "Roboto, sans-serif" }}
          >
            {error}
          </Alert>
        )}

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <BlinkBlur
              color="#3188cc"
              size="medium"
              text="Logging in..."
              textColor="#3188cc"
            />
          </Box>
        )}

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              fontSize: "1rem",
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#0d47a1" },
              py: 1,
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, fontFamily: "Roboto, sans-serif", color: "#555" }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Register
          </a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
