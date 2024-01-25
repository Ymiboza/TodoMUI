import "@fontsource/roboto/700.css";
import { Delete } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTodo, handleToggle } from "../../store/todoSlice";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ListItem
        key={id}
        style={{
          borderBottom: completed ? "1px solid #1976d2" : "1px solid white",
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            style={{ color: "white" }}
            onClick={() => dispatch(deleteTodo({ id }))}
          >
            <Delete />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton
          role={undefined}
          onClick={() => dispatch(handleToggle({ id }))}
          dense
        >
          <ListItemIcon style={{ minWidth: "0px" }}>
            <Checkbox
              edge="start"
              checked={completed}
              disableRipple
              inputProps={{ "aria-labelledby": id }}
            />
          </ListItemIcon>
          <ListItemText
            id={id}
            primary={
              <Typography
                style={{
                  textDecoration: completed ? "line-through" : "none",
                  textDecorationColor: completed ? "#1976d2" : "none",
                  fontSize: "20px",
                }}
              >
                {text}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
