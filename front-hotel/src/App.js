import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./component/admin/Admin";
import Home from "./component/public/Home";
import "./css/variable.css";

function App() {
  return (
    <div>
      <Switch>
        {/* de la route la plus spécifique à la plus générique */}

        <Route path="/admin/" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
      <header></header>
    </div>
  );
}

export default App;
