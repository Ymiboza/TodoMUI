import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField/InputField";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";
import { addNewTodo, fetchTodo } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    open: true,
    Transition: Fade,
    variant: "error",
  });
  const { status, error } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <Title />
      <InputField text={text} handleInput={handleInput} addTodo={addTask} />
      {status === "pending" && (
        <div className="loader">
          <CircularProgress variant="indeterminate" />
        </div>
      )}
      {error && (
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          key={state.Transition.name}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={state.variant}
            onClose={handleClose}
          >
            {"Error: " + error}
          </MuiAlert>
        </Snackbar>
      )}
      <TodoList />
    </>
  );
}

export default App;
