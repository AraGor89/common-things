import { FC } from "react";
import { Typography } from "@mui/material";
import {
  Route,
  Navigate,
  useLocation,
  Routes as ReactDomRoutes,
} from "react-router-dom";
import { IRoute } from "./types";
import cache from "../../utils/cache";
import { LOG_IN } from "../../constants";
import RegistrationForm from "../registrationForm/RegistrationForm";
import Todo from "./../todo/Todo";

const Routes: FC = () => {
  const { pathname } = useLocation();
  const isAuth = Boolean(cache.getItem(LOG_IN));
  const isRegistrationPage = pathname === "/signin" || pathname === "/login";
  const shouldBeRedirected = !isAuth && !isRegistrationPage;

  const routes: IRoute[] = [
    { path: "/", element: <div>User</div>, exact: true },
    { path: "/todos", element: <Todo />, exact: true },
    { path: "/login", element: <RegistrationForm />, exact: true },
    { path: "/signin", element: <RegistrationForm />, exact: true },
  ];

  return (
    <Typography component="div">
      <ReactDomRoutes>
        {routes.map((route: IRoute) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={(() =>
                shouldBeRedirected ? (
                  <Navigate to="/login" replace />
                ) : (
                  route.element
                ))()}
            />
          );
        })}
        <Route
          path="*"
          element={<Typography component="div">404 PAGE NOT FOUND</Typography>}
        />
      </ReactDomRoutes>
    </Typography>
  );
};

export default Routes;
