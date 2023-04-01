import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  let { pathname } = useLocation();
  const isAuth = Boolean(cache.getItem(LOG_IN));
  const user = cache.getItem(LOG_IN).login;

  const linkStyles = (name: string) => ({
    textDecoration: "none",
    color: pathname.includes(name) ? "yellow" : "white",
  });

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
              disabled
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* TODO: uncomment when user page is ready */}

            {/* <Typography variant="h6" component="div" marginRight={2}>
              News
            </Typography>
            <Typography variant="h6" component="div" marginRight={2}>
              <NavLink to={"/"} style={linksStyles}>
                User
              </NavLink>
            </Typography> */}
            <Typography variant="h6" component="div" marginRight={2}>
              <NavLink to={"/alias"} style={linkStyles("alias")}>
                The Game Alias
              </NavLink>
            </Typography>
            <Typography variant="h6" component="div" flexGrow={1}>
              <NavLink to={"/todos"} style={linkStyles("todos")}>
                To do
              </NavLink>
            </Typography>

            {isAuth ? (
              <>
                <Typography variant="h6" marginRight={2}>
                  {user}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogOut}
                  data-cy={"logout"}
                  variant="outlined"
                >
                  {"Logout"}
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/login")}
              >
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
