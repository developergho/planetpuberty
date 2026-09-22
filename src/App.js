import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "src/routes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    let s = document.createElement("script");
    s.setAttribute("data-account", "ABDxeiuqy5");
    s.setAttribute("src", "https://cdn.userway.org/widget.js");
    if(document.getElementsByClassName('nav-top') && document.getElementsByClassName('nav-top')[0]) {
      document.getElementsByClassName('nav-top')[0].appendChild(s);
    }
  }, []);
  return (
    <Router>
      <Routes>
        {routes.map((route, idx) => {
          const Component = route.component;
          return (
            <Route
              path={route.path}
              exact={route.exact}
              element={<Component />}
              key={idx}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
