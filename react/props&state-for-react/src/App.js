import React from "react";
import Count from "./components/Count";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  } 

  // counter +1
  increase = () =>{
    this.setState({counter:this.state.counter+1});
  }

  // counter -1
  decrease = () =>{
  this.setState({counter:this.state.counter-1});
  }
  render(){
    return(
      <Count 
          counter={this.state.counter}
          increase={this.increase}
          decrease={this.decrease}
      />
    );
  }
}

export default App;