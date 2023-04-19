import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">TodoList</Typography>
        </Box>
        <Link to="/">
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Link>
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
