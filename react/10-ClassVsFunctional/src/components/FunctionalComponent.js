import React, { useState } from "react";

const FunctionalComponent = () => {
const [name, setName] = useState("");

  const changeHandler = (e) =>{
    setName(e.target.value);
  }

  // componentDidMount, componentDidUpdate와 비슷하다
  useEffect(()=>{
      console.log("useEffect");
  },[name]);

  return (
    <div>
      <input
        type="text"
        value={name}
        name="name"
        onChange={changeHandler}
        placeholder="이름을 입력하세요"
      />
      <p>이름 : {name}</p>
    </div>
  );
};

export default FunctionalComponent;