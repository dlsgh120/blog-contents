import React from "react";
import styled, { css } from "styled-components";

class StyleComponent extends React.Component {
  render() {
    return (
      <Wrap>
        <ul>
          <ListExtends color={"#FF0000"}>home</ListExtends>
          <ListExtends color={"#0033FF"}>About</ListExtends>
          <ListExtends color={"#33FF00"}>Contact</ListExtends>
          <ListExtends>Test</ListExtends>
        </ul>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  background-color: #e5e5e5;
`;

const List = styled.li`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    font-size: 26px;
  }
  color: ${(props) => props.color};

  ${(props) =>
    !props.color &&
    css`
      &:hover {
        color: #ffff00;
      }
    `}
`;

//추가
const ListExtends = styled(List)`
  margin: 10px 0px;
  border: 1px solid #333;
`;

export const Wrap = styled.div`
    background-color:#e5e5e5;
`;

export default StyleComponent;