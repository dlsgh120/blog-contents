import React,{createRef} from "react"; //추가

//추가
class AutoFocusTextInput  extends React.Component{
    componentDidMount(){
        this.name.initHandler();
    }
    
    render(){
        return(
            <CustomTextInput  ref={(ref)=>this.name= ref}/>
        );
    }
}

class CustomTextInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:""
        }
        this.name = createRef();
    }
    
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    initHandler = () =>{
        this.setState({
            name:"",
            email:""
        })
        this.name.current.focus(); //변경
    }

    render(){
        return(
            <div style={{height:"3000px"}}>
                <input 
                    type="text" 
                    value={this.state.name} 
                    onChange={this.changeHandler}
                    placeholder="이름을 입력해주세요."
                    name="name"
                    ref={this.name} //변경
                />
                <input 
                    type="text" 
                    value={this.state.email} 
                    onChange={this.changeHandler}
                    placeholder="이메일을 입력해주세요."
                    name="email"
                />
                <button onClick={this.initHandler}>초기화</button>
            </div>
        );
    }
}

export default AutoFocusTextInput;