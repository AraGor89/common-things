import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import cache from "../../utils/cache";
import { LOG_IN } from "../../constants";

const Header = () => {
  let navigate = useNavigate();
  const isAuth = Boolean(cache.getItem(LOG_IN));
  const user = cache.getItem(LOG_IN).login;
  const linksStyles = { color: "white", textDecoration: "none" };

  const handleLogOut = () => {
    cache.removeAll();
    navigate("/login");
  };

  return (
    <Typography component="div">
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" marginRight={2}>
              News
            </Typography>
            <Typography variant="h6" component="div" marginRight={2}>
              <NavLink to={"/"} style={linksStyles}>
                User
              </NavLink>
            </Typography>
            <Typography variant="h6" component="div" flexGrow={1}>
              <NavLink to={"/todos"} style={linksStyles}>
                To do
              </NavLink>
            </Typography>

            {isAuth ? (
              <>
                <Typography variant="h6">{user}</Typography>
                <Button color="inherit" onClick={handleLogOut}>
                  {"Logout"}
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
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
