import React, { useState } from "react";

type User = {
  name: string,
  email: string,
};

//추가
interface GreetingsProps {
  clickUserData: (user: User) => void;
}

//추가
const Greetings = ({ clickUserData }: GreetingsProps) => {
  const [user, setUser] = useState<User>({name: "", email: ""});

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //추가
  const clickHandler = () => {
    clickUserData(user);
  };
  return (
    <div>
      <input
        type="text"
        value={user.name}
        name="name"
        onChange={changeHandler}
      />
      <input
        type="text"
        value={user.email}
        name="email"
        onChange={changeHandler}
      />
      // 추가
      <button onClick={clickHandler}>click</button>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}

export default Greetings;