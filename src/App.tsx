import { Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import Layout from "./layout/layout";
// import { useAppSelector } from "./store/hooks";
import cache from "./utils/cache";

function App() {
  // const isLoading = useAppSelector((state) => state.mainSlice.loading);
  // useEffect(() => {
  //   cache.setItem("login", { login: "123", pass: "ghgh" });
  // }, []);

  return (
    <Typography component="div">
      <Layout />
    </Typography>
  );
}

export default App;
