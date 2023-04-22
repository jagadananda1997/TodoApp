import todoModel from "../models/todo";
import express, { Request, Response } from "express";

const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo = new todoModel({
    title: title,
    userId: req.userId,
  });
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title } = req.body;
  const newTodo = {
    title: title,
    userId: req.userId,
  };
  try {
    await todoModel.findByIdAndUpdate(id, newTodo, { new: true });
    res.status(200).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.findByIdAndRemove(id);
    res.status(202).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoModel.find({ userId: req.userId });
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { createTodo, updateTodo, deleteTodo, getTodo };
