import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const linkButtonStyles = {
  color: "#333",
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  fontFamily: "Roboto, sans-serif",
  borderBottom: "3px solid transparent",
  borderRadius: 0,
  padding: 0,
  minWidth: "auto",
  marginLeft: "14px",
  marginRight: "14px",
  "&:hover": {
    color: "#1976d2",
    backgroundColor: "transparent",
    borderBottom: "3px solid #1976d2",
  },
};

const activeStyle = {
  color: "#1976d2",
  fontWeight: 600,
  borderBottom: "3px solid #1976d2",
};

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
    user = null;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleClose();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontFamily: "Roboto, sans-serif",
        px: 4,
        py: 1.5,
        minHeight: 56,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "2rem",
            fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
            cursor: "pointer",
            background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 1px 1px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease",
            letterSpacing: "-0.5px",
            "&:hover": {
              letterSpacing: "0px",
            },
          }}
          onClick={() => navigate("/")}
        >
          User Hub
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {token ? (
            <>
              <Typography
                sx={{
                  marginRight: 2,
                  color: "#666",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {user?.email}
              </Typography>

              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
                onClick={handleAvatarClick}
              >
                {user?.email?.charAt(0)}
              </Avatar>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={NavLink}
                to="/"
                sx={linkButtonStyles}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/register"
                sx={linkButtonStyles}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
