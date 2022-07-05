import "./App.css";
import { Typography } from "@mui/material";
import Layout from "./layout/layout";

function App() {
  console.log(process.env);
  return (
    <Typography component="div">
      <Layout />
    </Typography>
  );
}

export default App;
