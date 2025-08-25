import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Paper,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    hobby: "reading",
    skill_level: "beginner",
    short_bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    name,
    email,
    password,
    confirmPassword,
    gender,
    hobby,
    skill_level,
    short_bio,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        gender,
        hobby,
        skill_level,
        short_bio,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="sm" sx={{ mx: "auto", mt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 2, fontWeight: 600, color: "#1976d2" }}
        >
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />

          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender" value={gender} onChange={onChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Hobby</FormLabel>
            <Select name="hobby" value={hobby} onChange={onChange}>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="traveling">Traveling</MenuItem>
              <MenuItem value="cooking">Cooking</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Skill Level</FormLabel>
            <Select name="skill_level" value={skill_level} onChange={onChange}>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Short Bio"
            name="short_bio"
            value={short_bio}
            onChange={onChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#0d47a1" },
              py: 1,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#555" }}
        >
          Already have an account?{" "}
          <a href="/" style={{ color: "#1976d2", textDecoration: "none" }}>
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
