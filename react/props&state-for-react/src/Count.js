import React from "react";
import propTypes from "prop-types";

class Count extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.counter}</p>
                <button onClick={this.props.increase}>+</button>
                <button onClick={this.props.decrease}>-</button>
            </div>
        );
    }
}

Count.propTypes = {
    counter:propTypes.number.isRequired,
    increase:propTypes.func.isRequired,
    decrease:propTypes.func.isRequired
}

export default Count;