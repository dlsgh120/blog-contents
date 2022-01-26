import React from "react";
import Greetings from "./components/Greetings";

// interface로 정의 가능
type User = {
  name: string,
  email: string,
};

const App = () => {
  // 추가
  const clickUserData = (user: User) => {
    console.log(user);
  };
  return (
    <Greetings
      clickUserData={clickUserData} //추가
    />
  );
};

export default App;