import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">TodoList</Typography>
        </Box>
        {auth ? (
          <Link onClick={logout} to="/">
            <Button type="submit" variant="contained" color="primary">
              Logout
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button type="submit" variant="contained" color="primary"
            sx={{ marginLeft: "8px" }}
            >
              Sign Up
            </Button>
          </Link>
        )}
        <Link to="/login">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: "8px" }}
          >
            Login
          </Button>
        </Link>
        <Link to="/todo">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: "8px" }}
          >
            Todo
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
