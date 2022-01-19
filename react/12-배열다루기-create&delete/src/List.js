import React from "react";

class List extends React.Component {
  state = {
    name: "",
    email: "",
    data: [
      { id: 0, name: "홍길동", email: "aaaa@gmail.com" },
      { id: 1, name: "김철수", email: "bbbb@gmail.com" },
      { id: 2, name: "박아무개", email: "cccc@gmail.com" },
      { id: 3, name: "최인호", email: "dddd@gmail.com" },
    ],
    nextId: 4,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createHandler = () => {
    this.setState({
      data: [
        ...this.state.data,
        {
          id: this.state.nextId,
          name: this.state.name,
          email: this.state.email,
        },
      ],
      name: "",
      email: "",
      nextId: this.state.nextId + 1,
    });
  };

  // 추가
  removeHandler = (id) => {
    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });
  };

  render() {
    const containerStyles = {
      margin: "20px 300px",
    };

    const arrayStyles = {
      border: "1px solid",
      margin: "10px 0px 0px 0px",
    };
    return (
      <div style={containerStyles}>
        <input
          type="text"
          value={this.state.name}
          placeholder="이름을 입력해주세요."
          onChange={this.changeHandler}
          name="name"
        />
        <input
          type="text"
          value={this.state.email}
          placeholder="이메일을 입력해주세요."
          onChange={this.changeHandler}
          name="email"
        />
        <button onClick={this.createHandler}>추가</button>
        {this.state.data.map((item) => (
          <div key={item.id} style={arrayStyles}>
            <p>아이디: {item.id}</p>
            <p>이름: {item.name}</p>
            <p>이메일: {item.email}</p>
            // 추가
            <button onClick={() => this.removeHandler(item.id)}>제거</button>
          </div>
        ))}
      </div>
    );
  }
}

export default List;