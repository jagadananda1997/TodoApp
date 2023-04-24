import React, { useState, useEffect } from "react";

import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

interface Todo {
  _id: string;
  title: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    handleGetTodo();
  }, []);

  const handleGetTodo = async () => {
    try {
      const res = await fetch("http://localhost:8000/todo", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();

      // if (Array.isArray(data)) {
      setTodos([data]);
      // } else {
      //   console.log("API response is not an array");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTodo = async () => {
    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      _id: Date.now().toString(),
      title: inputValue,
    };

    try {
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        credentials: "include",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      if (data.status === 400 || !data) {
        window.alert("Failed to add todo");
        console.log("Failed to add todo");
      } else {
        window.alert("Todo Added");
        console.log("Todo Added");
      }

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      console.log("Delete successful");

      if (data) {
        handleGetTodo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTodo = async (id: string, newTitle: string) => {
    const updatedTodo: Todo = {
      _id: id,
      title: newTitle,
    };

    try {
      const res = await fetch(`http://localhost:8000/todo/${id}`, {
        method: "PUT",
        credentials: "include",

        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      if (!res.ok) {
        window.alert("Failed to update todo");
        console.log("Failed to update todo");
        return;
      }

      window.alert("Todo updated");
      console.log("Todo updated");

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error(error);
      window.alert("Failed to update todo");
    }
  };

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
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
            ToDoList
          </Typography>
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            endIcon={<Add />}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Box>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo._id}>
            <ListItemText primary={todo.title} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  const newTitle = prompt("Enter new title:", todo.title);
                  if (newTitle !== null) {
                    handleEditTodo(todo._id, newTitle);
                  }
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TodoList;
