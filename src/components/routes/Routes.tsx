import { FC } from "react";
import { Typography } from "@mui/material";
import {
  Routes as ReactDomRoutes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { IRoute } from "./types";
import cache from "../../utils/cache";
import Login from "./../login/Login";

const Routes: FC = () => {
  const { pathname } = useLocation();

  const isAuth = Boolean(cache.getItem("login"));
  const isSignInPage = pathname === "/signin" || pathname === "/login";
  const shouldBeRedirected = !isAuth && !isSignInPage;

  console.log(shouldBeRedirected);

  const routes: IRoute[] = [
    { path: "/", element: <div>User</div>, exact: true },
    { path: "/todos", element: <div>To do</div>, exact: true },
    { path: "/login", element: <Login />, exact: true },
    { path: "/signin", element: <div>Signin</div>, exact: true },
  ];

  return (
    <Typography component="div">
      <ReactDomRoutes>
        {routes.map((route: IRoute) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              // element={!true ? <Navigate to="/login" replace /> : route.element}
              element={(() => {
                if (shouldBeRedirected) {
                  return <Navigate to="/login" replace />;
                }

                return route.element;
              })()}
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
