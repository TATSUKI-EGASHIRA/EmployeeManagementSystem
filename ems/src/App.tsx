import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./normalize.css";
import Login from "./Login";
import MemberPage from "./MemberPage";

const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;

const App: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route
          path="/MemberPage"
          render={() =>
            isAuthenticated ? <MemberPage /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
