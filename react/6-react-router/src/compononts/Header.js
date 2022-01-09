import React from "react";
import { Link } from "react-router-dom"; //추가

class Header extends React.Component {
  render() {
    return (
      <div>
        // 추가
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/posts">post</Link>
      </div>
    );
  }
}

export default Header;