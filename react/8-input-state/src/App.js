import React from "react";
import FormInput from "./components/FormInput";

class App extends React.Component{

  // 추가
  createHandler = (userData) =>{
      console.log(userData);
  }
  render(){
    return(
      <div className="App">
        <FormInput createHandler={this.createHandler}/> //변경
      </div>
    );
  }
}

export default App;