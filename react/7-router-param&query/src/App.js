import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"; 
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Post from "./components/Post"; 
import NotMatch from "./components/NotMatch";

class App extends React.Component{
  render(){
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about/" component={About} />
                <Route exact path="/about/:name" component={About} />
                <Route path="/about/:name/:age" component={About} /> //추가
                {/* <Route path="/posts" component={Post} />
                <Route path="*" component={NotMatch} /> */}
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;