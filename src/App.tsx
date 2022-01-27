import { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index";
import MuiTheme from "./theme";

const App: FC = () => {
  return (
    <div className="App">
      <MuiTheme>
        <div className="background" />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MuiTheme>
    </div>
  );
};

export default App;
