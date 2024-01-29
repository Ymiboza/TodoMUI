import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=15"
      );

      if (!response.ok) throw new Error("Sever error!");

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/removeTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Cant't delete task");

      dispatch(deleteTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todo/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const item = getState().todo.todo.find((item) => item.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !item.completed,
          }),
        }
      );

      if (!response.ok) throw new Error("Cant't toggle status");

      dispatch(handleToggle({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todo/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
        id: uuidv4(),
      };

      console.log("Todo data:", todo);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) throw new Error("Cant't add task");

      const data = await response.json();
      console.log(data);
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push(action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, setError)
      .addCase(removeTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError);
  },
});

const { addTodo, deleteTodo, handleToggle } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
