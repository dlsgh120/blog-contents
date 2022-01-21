import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); //추가

  // 변경
  const getApi = async () => {
    try {
      setLoading(true);

    //   await axios
    //     .get("https://jsonplaceholder.typicode.com/posts")
    //     .then((res) => setItems(res.data));
    
    // 주로 다음과 같은 방식으로 사용됨
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setItems(res.data);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const listStyles = {
    borderBottom: "1px solid",
  };

  // 추가
  if (loading) return <div>데이터를 불러오는 중입니다....</div>;
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={listStyles}>
          <p>id: {item.id}</p>
          <p>title: {item.title}</p>
          <p>body: {item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiList;