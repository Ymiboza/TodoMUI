import "@fontsource/roboto/700.css";
import { Delete } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTodo, toggleStatus } from "../../store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ListItem
        key={id}
        style={{
          borderBottom: completed ? "1px solid #1976d2" : "1px solid white",
        }}
        secondaryAction={
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              edge="end"
              aria-label="delete"
              style={{ color: "white" }}
              onClick={() => dispatch(removeTodo(id))}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        }
        disablePadding
        sx={{
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.5)",
          },
        }}
      >
        <ListItemButton onClick={() => dispatch(toggleStatus(id))} dense>
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
                {title}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
