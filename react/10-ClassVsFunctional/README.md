# Class Component VS Functional Component 그리고 Hooks

### 개요

Class Component 와 Functional Component의 차이점에 대하여, 그리고, Functional Component에 대해 조금더 자세히 알아보자.
솔직히 요즘 React로 개발을 할때, Functional Component로 대부분 개발이 이루어 진다고 해도 무방하다.

하지만 Class Component에 대한 내용도 반드시 알고 있어야 된다고 생각한다.

그 이유는, 리액트가 어떤 생명주기로 랜더링이 되는지를 알고 있어야, 리액트로 개발을 할 수 있다. 또한 왜 요즘에는 Class Component로 개발 되지 않고 Functional Component로 개발 되는지를 본인 스스로 깨닫고, Functional 컴포넌트가 가지는 장점 등을 이해 하기 위해서는 Class Component도 알고 있어야 된다고 생각한다.

### Class Component 형태

클래스형 컴포넌트의 형태는 아래의 코드와 같다.

```js
import React from "react";

class ClassComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

export default ClassComponent;
```

### Functional Component의 형태

함수형 컴포넌트의 형태는 아래의 코드와 같다.

```js
import React from "react";

function FunctionalComponent(props) {
  return <div>{props.name}</div>;
}

export default FunctionalComponent;
```

위의 방식 말고 ES6의 문법인 Arrow Function을 사용해서 만들 수도 있다.

```js
import React from "react";

const FunctionalComponent = (props) => {
  return <div>{props.name}</div>;
};

export default FunctionalComponent;
```

이와 같이 Functional Component의 기본적인 형태를 지니고 있다.

클래스 컴포넌트와 비교 했을때, 더 간결한 모양을 확인할 수 있다.
위의 코드들에는 state에 대한 정의를 하지 않았지만, 클래스형 컴포넌트와 함수형 컴포넌트의 가장 큰 차이는 state와, LifeCycle 이다.

### Class Component와 Functional Component의 차이

#### Class Component

- State 및, LifeCycle Api 사용이 가능하다.
- render 함수가 반드시 존재해야 한다.

#### Functional Component

- State 및 LifeCycle은 Hook을 통해 해결 (useState, useEffect 등)
- 메모리 자원을 클래스 컴포넌트 보다 덜 사용한다.
- 간결하며, 클래스 컴포넌트에서 사용하는 this 및 bind를 사용하지 않아도 된다.

위와 같은 차이를 가지고 있지만, 이러한 차이가 나중에 성능적으로 어떠한 큰 차이가 있는지 크게 와닫지 않을 수도 있다.

하지만, Functional Component를 왜 사용하는지를 보면, 잘 와닿을 것이다.

> 공식 문서에는 Functional Component와 Hooks를 사용하여 컴포넌트를 작성하는 것을 권장하고 있다.

### 함수형 컴포넌트는 왜 사용할까?

Functional Component에서 Hook을 사용하여 ClassComponent의 lifeCycle을 구현 할 수 있다.

또한, Class Component에서 사용하는 this를 사용하지않아도 된다.

이러한 장점들은 보다 간결하고, 추적하기 쉽다는 장점이 있다.

예를들어보면, 클래스 컴포넌트에서 처음 API를 ComponentDidMount로 불러와서, 렌더링을 시키고, ComponentDidUpdate로 값을 변경시키고 이러한 번거로운 작업을 Functional Component에서는 Hook인 useEffect 하나로 해결 할 수 있다.

나아가, 규모가 커지고 여러명의 개발자와 함께 개발을 할 때, functional component로 작성한다면, 간결하고 조금 더 효율적으로 코드를 작성되고, 또 어디에서 어떤 기능을 담당하는지 추적이 수월 할 것이다.

이러한 글들로 이해가 안될수도 있지만, 개발을 하다보면 바로 깨닫게 될 것이다.

위의 내용들에 대해서 간단하게 예제를 통해 어떻게 코드로 작성되는지 알아 보자.

#### 함수형 컴포넌트에서의 State관리

함수형 클래스에서의 State관리는 리액트에 내장된 useState라는 Hooks을 사용 한다. 간단한 예제를 통하여 state를 선언하며, 이 값들이 어떻게 바뀌는지 알아 보겠다.

```js
import React, { useState } from "react";

const FunctionalComponent = () => {
  const [name, setName] = useState("");

  const changeHandler = (e) => {
    setName(e.target.value);
  };
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
```

이 코드를 보면 클래스형 컴포넌트에서 input name변경하는 부분과 동일 한 내용이다.

클래스형 컴포넌트에서는 constructor 내부에 state를 선언했고,
arrow function을 사용하지 않을때에는 bind를 시켜줘야 했다.

또한, onChange 이벤트 핸들러가 발생시 함수를 호출 할때, this를 사용하지 않았다.

확실히 클래스형 컴포넌트보다 간결한 구조를 확인할 수 있다.

#### useEffect

함수형 컴포넌트에서는 useEffect라는 Hooks 를 사용하여, 클래스형 컴포넌트와 같이 lifeCycle 기능을 수행 할 수 있다.

useEffect는 클래스형 컴포넌의 lifeCycle API인 componentDidMount, componentDidUpdate, componentWillUnmount 세가지 역할을 수행하는 목적으로 제공 되지만, 하나의 API로 통합 된 것이다.

다음 예제를 통해 간단하게 확인해 보자.

```js
import React, {useState, useEffect} from "react";

const FunctionalComponent = () =>{
    const [name, setName] = useState("");

    const changeHandler = (e) =>{
        setName(e.target.value);
    }
    // componentDidMount, componentDidUpdate와 비슷하다
    useEffect(()=>{
        console.log("useEffect");
    });
    return(
        // ...동일
    );
}

export default FunctionalComponent;
```

useEffect를 사용하여 위와 같이 클래스형 컴포넌트의 LifeCycle API componentDidMount 및 componentDidUpdate 와 같은 동작을 수행 할 수 있다.

그리고 위의 코드를 아래와 같이 작성해보자.

```js
useEffect(() => {
  console.log("useEffect");
}, [name]);
```

위의 코드는 name 이라는 state값을 감지하여, 이 값이 변경 될때마다 실행되는 기능 이다.

### 마치며

Class Component 와 Functional Component의 차이점에 대해 알아보았다.

두개의 방식은 state및 lifeCycle의 대한 차이가 가장 컷지만, 리액트에서 Hooks가 생겨, 함수형 컴포넌트에서도 클래스형 컴포넌트와 동일하게 state 및 lifeCycle을 수행할 수 있다.

> 문서에서는 Functional Component + Hooks 를 사용하는것을 권장 하고 있다.

참고 : [https://velopert.com/2994](https://velopert.com/2994)

참고 : [https://ko.reactjs.org/docs/hooks-overview.html](https://ko.reactjs.org/docs/hooks-overview.html)

# 블로그 링크

> https://dlsgh120.tistory.com/44
