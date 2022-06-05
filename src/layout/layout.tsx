import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./../components/header/Header";
import Routes from "./../components/routes/Routes";

const Layout = () => {
  return (
    <Typography component="div">
      <Header />
      <Routes />
    </Typography>
  );
};

export default Layout;
