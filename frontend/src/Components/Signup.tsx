import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate, user]);

  let name, value;
  const handleInputs = (e: any) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = user;
    if (!name || !email || !password) {
      window.alert("Please fill all the fields");
    } else {
      let res = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
// where is the credentials property?
      const data = await res.json();
      if (data.status === 400 || !data) {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        localStorage.setItem("user", JSON.stringify(data));

        window.alert("Registration Successfull");
        console.log("Registration Successfull");
        navigate("/login");
      }
    }
  };

  return (
    <form method="POST">
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography variant="h2" padding={3} textAlign="center">
          SignUp
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Name"
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <Button
          endIcon={<HowToRegOutlinedIcon />}
          sx={{ marginTop: 3, borderRadius: 3 }}
          type="submit"
          name="signup"
          id="signup"
          value="register"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
