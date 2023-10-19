import React from "react";
import Mypage from "./mypage";
import { BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route>
        <Mypage />
      </Route>
    </BrowserRouter>
  );
};

export default App;
