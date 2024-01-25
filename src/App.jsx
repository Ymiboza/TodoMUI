import { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "./components/InputField/InputField";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";
import { addTodo } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({ text }));
    setText("");
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container">
      <Title />
      <InputField text={text} handleInput={handleInput} addTodo={addTask} />
      <TodoList />
    </div>
  );
}

export default App;
