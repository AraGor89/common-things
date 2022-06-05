import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import cache from "../../utils/cache";

const Header = () => {
  const linksStyles = { color: "white", textDecoration: "none" };
  const isAuth = Boolean(cache.getItem("login"));
  // console.log(isAuth);

  const handleLogin = () => {};

  const handleLogOut = () => {
    cache.removeAll();
  };

  return (
    <Typography component="div">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <NavLink to={"/"} style={linksStyles}>
              Users
            </NavLink>
            <NavLink to={"/todos"} style={linksStyles}>
              To do
            </NavLink>

            {isAuth ? (
              <Button color="inherit" onClick={handleLogOut}>
                {"Logout"}
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                {"Login"}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Typography>
  );
};

export default Header;
