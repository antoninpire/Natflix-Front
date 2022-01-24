import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router } from "react-router-dom";
import { NotFound } from "./views/NotFound";
import {
  privateRoutes,
  publicRoutes,
  PublicRoute,
  PrivateRoute,
} from "./routes";
import { v4 as uuid } from "uuid";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {privateRoutes.map((item) => (
            <PrivateRoute
              exact
              path={item.path}
              component={item.component}
              key={uuid()}
            />
          ))}
          {publicRoutes.map((item) => (
            <PublicRoute
              exact
              path={item.path}
              component={item.component}
              key={uuid()}
            />
          ))}
          <Route exact strict component={NotFound} />
        </Switch>
        <ToastContainer autoClose={8000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
