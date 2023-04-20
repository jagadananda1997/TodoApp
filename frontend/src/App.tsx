import React from "react";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./Components/Todolist";
import PrivateComponent from "./Components/PrivateComponent";
function App() {
  const handleSignUp = (name: string, email: string, password: string) => {};

  const handleLogin = (email: string, password: string) => {};
  return (
    <div>
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<SignUp onSignUp={handleSignUp} />}
            ></Route>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            ></Route>


            <Route element = {<PrivateComponent/>}>
              <Route
              path="/todo"
              element={<TodoList/>}
            ></Route>
            </Route>
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
