import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Post from "./components/Post";
import NotMatch from "./components/NotMatch"; //추가

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/posts" component={Post} />
          <Route path="*" component={NotMatch} /> //추가
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;