import React from "react";

class FormInput extends React.Component{
    state = {
        name:"",
        email:""
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) =>{
        e.preventDefault();
        this.props.createHandler(this.state); //추가
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <input type="text"
                    value={this.state.name}
                    placeholder="이름을 입력하세요."
                    onChange={this.changeHandler}
                    name="name"
                />
                <input type="text"
                    value={this.state.email}
                    placeholder="이메일을 입력하세요."
                    onChange={this.changeHandler}
                    name="email"
                />
                <button type="submit">등록</button>
                <div>
                    이름 : {this.state.name}<br />
                    이메일 : {this.state.email}
                </div>
            </form>
        );
    }
}

export default FormInput;