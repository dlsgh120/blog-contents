import React from "react";

class Count extends React.Component{
    constructor() {
        super();
        this.state = {
          counter: 0,
        };

        console.log("1. constructor");
      }

      static getDerivedStateFromProps(nextProps, prevState){
        console.log("2. getDerivedStateFromProps");
      }
      componentDidMount(){
        console.log("4. componentDidMount");
      }
      
      //추가
      componentDidUpdate(prevProps, prevState){
          if(this.state.counter !== prevState.counter){
              console.log("componentDidUpdate")
          }
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
        console.log("3. render")
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