# 배열 다루기 생성 및 제거

### 개요

바로 이전 포스트에서는 Array.map 함수를 활용하여, 어떻게 화면에 보여지도록 하는지에 대해 알아보았다.

이번 포스트에서는 배열에 내용을 추가하거나, 삭제하는 방법에 대해 알아보겠다

### 배열 생성

Javascript를 다뤄 보았다면, 배열에 데이터를 추가할 때, Array.push를 사용하면 될 것이라고 생각을 할수도 있다.

리액트에서는 state의 내부값을 직접적으로 수정 하면 절대로 안된다.
그 이유는 **불변성을 유지**시키기 위해서 이다.

이를 위해, push, splice, unshift, pop 등과 같은 내장함수는 배열 자체를 직접 수정하게 되어, 적합하지 않다.

> 불변성을 유지해야, 리액트에서 모든 것들이 필요한 상황에 리렌더링 되도록 설계가 가능하며, 추후에 최적화를 할 수 있다.

리액트는 state의 불변성을 유지시키기 위해, 기존 배열에 기반하여, 새 배열을 만드는 함수인 concat, slice, map, filter과 같은 함수를 사용 한다

그러면 배열을 생성하기 전, Javascript의 concat에 대한 내용을 간단히 살펴본 후, 리액트에서 어떻게 적용하는지 알아보겠다.

#### concat

concat 함수는 Javascript의 내장함수로 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환하는 함수 이다.

여기서 반드시 알아야 할 내용은, 기존 배열을 변경하지 않고, 새 배열을 반환 하는 것 이다.
간단한 예제를 통해 자세히 알아보자.

```js
const arr1 = ["a", "b", "c"];
const arr2 = ["d", "e", "f"];

// concat
const concatArr = arr1.concat(arr2);

console.log(concatArr); // ouput: Array["a","b","c","d","e","f"]
```

위의 코드를 보면, concatArr라는 변수에, arr1 배열과, arr2 배열이 합쳐서 새로운 배열을 만들었다.

그러면 concat 함수를 이용하여, 리액트에서 활용해보자.

#### src/components/List

```js
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
      data: this.state.data.concat({
        id: this.state.nextId,
        name: this.state.name,
        email: this.state.email,
      }),
      name: "", //추가될 이름
      email: "", //추가될 이메일
      nextId: this.state.nextId + 1, //고유의 id를 가지기 위해 1씩 ++
    });
  };

  render() {
    // CSS-in-JS
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
          </div>
        ))}
      </div>
    );
  }
}

export default List;
```

실행을 한번 해보자.

정상적으로 잘 작동을 할 것이다.

state의 내용을 보면 state에는 추가할 내용의 name과, email이 존재하고, 컴포넌트에 랜더링이 될 data, 다음 id값을 가지는 nextId 값이 있다.

그리고 return 내부를 살펴보면, this.state.data를 map함수를 실행시켜, 랜더링 시켰다.

이제, data에 추가를 하기 위해서는, name과 email을 onChange 이벤트 핸들러가 발생하여, state값을 변경시켜며, 추가 버튼을 눌렀을때, onClick 이벤트 핸들러가 발생하여 state의, data값을 변경시켜준다.

데이터는 concat을 수행하며, 기존 this.state.data에, id, name, email이 추가되어, 새 배열로 변경 되어, 다시 랜더링이 일어난다.

#### spread 연산자

배열을 합치기 위해 concat 함수보다 더 직관적이고 간단한 방법이 있다.

javascript ES6 이후 부터 사용 가능한 spread([...]) 전개 연산자 이다

spread연산자는 변수 앞에 ...을 찍어 선언한다. 다음과 같이 예시를 살펴보자.

```js
const arr1 = ["a", "b", "c"];
const arr2 = ["d", "e", "f"];

// spread
const SpreadArr = [...arr1, ...arr2];
console.log(SpreadArr); // ouput: Array["a","b","c","d","e","f"]
```

이러한 방식으로 Spread 연산자는 연산자의 대상 배열을 개별 요소로 분리 한다.

이제 Spread연산자를 이용한 리액트 예제를 살펴 보자. 코드는 Concat을 사용한 것과 동일하다.

#### src/component/List

```js
import React from "react";

class List extends React.Component{
    state={
        name:"",
        email:"",
        data:[
            {id:0, name:"홍길동", email:"aaaa@gmail.com"},
            {id:1, name:"김철수", email:"bbbb@gmail.com"},
            {id:2, name:"박아무개", email:"cccc@gmail.com"},
            {id:3, name:"최인호", email:"dddd@gmail.com"}
        ],
        nextId:4
    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    createHandler = () =>{
        this.setState({
            // data:this.state.data.concat({id:this.state.nextId, name:this.state.name, email:this.state.email}),
            data:[...this.state.data, {id:this.state.nextId, name: this.state.name, email: this.state.email}], // Spread 연산자
            name:"",
            email:"",
            nextId:this.state.nextId+1
        })
    }
    render(){
         // ...동일
        return(
            // ...동일
        );
    }
}

export default List;
```

바뀐내용은 추가 버튼의 onClick 이벤트 핸들러가 발생하였을때, state의 data를 변경할때, concat 함수에서, spread 연산자로 바뀐 것 이다. 다른 내용은 동일하다.

이렇게 spread 연산자로 변경하여, 실행해 보자. concat과 동일하게 작동 될 것이다.

### 배열 삭제

리액트에서 배열을 삭제하기 위해서는 기존 요소를 삭제하는 자바스크립트의 push 및 splice를 사용하지 않고, 새 배열로 반환하는 filter 함수를 사용한다.

리액트에서 filter 함수를 활용 해 보기전, javascript에서의 filter 함수에 대해 간단하게 알아보자.

```js
const arr = ["a", "b", "c", "d"];

// filter
const filterArr = arr.filter((item) => item !== "a");
console.log(filterArr); // ouput: Array["b","c","d"]
```

위의 코드와 같이 filter 함수는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환을 수행한다.

즉, arr의 item인 a,b,c,d를 "a"와 비교를 하여, 같지 않을 경우인 b,c,d를 새 배열로 반환 한 것 이다.

이제 리액트에서 Array.filter 함수를 사용하여, 배열 삭제 하는 예제에 대해 알아보자. 다음과 같이 코드를 기존 코드에서 추가하자.

```js
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
```

위와 같이 삭제 button을 추가하여, onClick 이벤트 핸들러가 발생했을 경우에, filter 함수를 수행하여, state의 data값을 변경 한다.

주의 할 내용은 onClick 이벤트 핸들러가 발생했을때, 호출하는 함수에, 인자값을 전달해 주어야 한다. 이때 인자값은, Element의 id 값을 전달한다.

removeHandler 함수가 수행될때, state의 data의 배열을 filter함수를 통해서, 전달받은 id 값과 비교를 하여, 같지 않은 값을 반환하여, data 값을 변경 해준다.

### 마치며

배열을 생성하고 삭제하는 방법에 대해 알아보았다.

기억해야하는 내용은 state는 불변성을 유지 시키기 위해, 기존 배열에 대해 push, splice, pop 등의 메서드를 사용하는 것이 아닌, 새 배열을 반환 시켜주는 concat, filter 메서드를 사용해야한다.

참고: [Array.prototype.concat() - javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

참고:[Array.prototype.filter() - javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

# 블로그 링크

> https://dlsgh120.tistory.com/46
