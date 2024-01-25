import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    deleteTodo(state, action) {
      state.todo = state.todo.filter((item) => item.id !== action.payload.id);
    },
    handleToggle(state, action) {
      const toggledTodo = state.todo.find(
        (item) => item.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
});

export const { addTodo, deleteTodo, handleToggle } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
