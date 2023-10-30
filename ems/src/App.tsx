import React from "react";
import Login from "./Login";
import { BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route>
        <Login />
      </Route>
    </BrowserRouter>
  );
};

export default App;
