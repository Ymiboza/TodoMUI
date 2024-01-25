import "@fontsource/roboto/700.css";
import { List } from "@mui/material";
import { useSelector } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const todo = useSelector((state) => state.todo.todo);
  return (
    <div className="list-box">
      <List sx={{ width: "100%", maxWidth: 780 }}>
        {todo.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
