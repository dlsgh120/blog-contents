import React from "react";

class List extends React.Component {
  render() {
    //list
    const data = [
      { id: 0, name: "홍길동", email: "aaaa@gmail.com" },
      { id: 1, name: "김철수", email: "bbbb@gmail.com" },
      { id: 2, name: "박아무개", email: "cccc@gmail.com" },
      { id: 3, name: "최인호", email: "dddd@gmail.com" },
    ];

    // CSS-in-JS
    const style = {
      border: "1px solid",
      margin: "10px 300px",
    };

    return (
      <div>
        // map 활용
        {data.map((item) => (
          <div key={item.id} style={style}>
            <p>이름: {item.name}</p>
            <p>이메일: {item.email}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default List;