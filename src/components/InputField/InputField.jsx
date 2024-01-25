import SendIcon from "@mui/icons-material/Send";
import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";

const InputField = ({ text, handleInput, addTodo }) => {
  return (
    <div className="writ-box">
      <TextField
        id="outlined-basic"
        label="Writing here"
        variant="outlined"
        color="primary"
        style={{
          width: "640px",
        }}
        value={text}
        onChange={handleInput}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
      />
      <Button
        onClick={addTodo}
        variant="contained"
        size="large"
        endIcon={<SendIcon />}
        style={{ marginLeft: "15px", padding: "15px 15px" }}
      >
        ADD Todo
      </Button>
    </div>
  );
};

InputField.propTypes = {
  text: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default InputField;
