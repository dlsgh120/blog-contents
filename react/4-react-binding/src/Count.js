import React from "react";

class Count extends React.Component{
    constructor() {
        super();
        this.state = {
          counter: 0,
        };
      } 

      //arrow function 변경
      increase = () =>{
        this.setState({counter:this.state.counter+1});
      }

      //arrow function 변경
      decrease = () =>{
        this.setState({counter:this.state.counter-1});
      }

    render(){
        return(
            <div>
                <p>{this.state.counter}</p>
                <button onClick={this.increase}>+</button>
                <button onClick={this.decrease}>-</button>
            </div>
        );
    }
}


export default Count;