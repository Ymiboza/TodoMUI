import { Typography } from "@mui/material";
import "@fontsource/roboto/700.css";

const Title = () => {
    
  return (
    <div className="title-box">
      <Typography
        variant="h1"
        component="h2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>IT&lsquo;</span>
        <span style={{ color: "#1976d2" }}>s</span>
        <span> YOUR&lsquo;</span>
        <span style={{ color: "#1976d2" }}>s</span>
        <span> TODO&lsquo;</span>
        <span style={{ color: "#1976d2" }}>s</span>
      </Typography>
    </div>
  );
};

export default Title;
