import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
   const res = await  fetch("http://localhost:5000/users/login",{
    method:"POST",
    headers:{
        "Content-Type" : "applicaton/json"
    },
    body:JSON.stringify({
        email, password
    })
   });
   const data = res.json();
   if(res.status === 400 || !data){
    window.alert("Invalid Credentials");
   }else{
    window.alert("Login Successful");
   }
    onLogin(email, password);
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
          Login
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          endIcon={<LoginOutlinedIcon />}
          sx={{ marginTop: 3, borderRadius: 3 }}
          type="submit"
          name="signin"
          id="signin"
    
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default Login;
