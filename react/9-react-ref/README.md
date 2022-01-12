# DOM에 접근할 때, ref 사용하기

### 개요

DOM에 직접적인 접근을 할때 사용하는 ref에 대해 알아 보겠다.
Vanilla Javascript에서는 DOM 객체에 접근하기 위해, querySelector 또는 getElementById API를 사용해야 한다.
반면, 리액트에서는 DOM API를 이용한 컴포넌트 제어 방식을 권장하지 않기 때문에 ref를 사용한다.

#### 왜 DOM API 가 아닌 ref를 사용하는가?

1. 기본적으로 array map 메소드를 이용한 렌더링이 되는 리스트 형태의 Element는 같은 id를가지기에 특정 DOM 객체(querySelector, getElementById)로 판별하기 어렵다.
2. 리액트를 이용한 웹 소프트 웨어에서는 데이터는 State로 조작되기 때문에, DOM API와 혼합해서 조작을 할 경우, 디버깅이 어려워지고 유지보수가 어려운 코드가 된다.

따라서, 리액트에서는 DOM API를 이용한 컴포넌트 제어 대신 ref 라는 기능을 제공 한다.

#### 언제 ref가 사용되는가?

1. input 및 textarea 등에 Focus를 해야할 경우 사용
2. 특정 DOM의 크기 및 스크롤 위치를 가져오거나 설정 할때 사용
3. 써드 파티 DOM 라이브러리를 통합할 때(Canvas, Chart 등) 사용

이와같이 Ref는 주로 다음 기능을 수행 할때 사용 된다.

또한, [React 공식문서](https://reactjs-kr.firebaseapp.com/docs/refs-and-the-dom.html)에서 확인 할 수 있듯이, Ref를 과하게 쓰는 것은 좋지 않다고 한다.

이제, Ref를 사용하여 버튼을 눌렀을때, input 창에 Focus를 주는 간단한 예제를 만들어 보자.

### DOM 요소에 Ref 추가하기

리액트는 모든 컴포넌트에 첨부할 수 있는 특별한 속성을 지원한다. ref 속성은 콜백함수를 받고 컴포넌트가 마운트 되거나 언마운트 된 이후 즉시 실행 된다.

ref 속성을 HTML 요소에서 사용하면, ref 콜백은 기본 DOM 요소를 인수로 받는다.

이제, 간단한 예제를 통해 알아보자.

#### CallBack

#### src/components/CustomTextInput

```js
import React from "react";

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  initHandler = () => {
    this.setState({
      name: "",
      email: "",
    });
    this.name.focus();
  };

  render() {
    return (
      <div style={{ height: "3000px" }}>
        <input
          type="text"
          value={this.state.name}
          onChange={this.changeHandler}
          placeholder="이름을 입력해주세요."
          name="name"
          ref={(ref) => (this.name = ref)}
        />
        <input
          type="text"
          value={this.state.email}
          onChange={this.changeHandler}
          placeholder="이메일을 입력해주세요."
          name="email"
        />
        <button onClick={this.initHandler}>초기화</button>
      </div>
    );
  }
}

export default CustomTextInput;
```

코드를 보면 input 태그에 ref를 추가하였다.
이름을 this.name이라고 지었지만, 다른 이름을 사용하셔도 상관 없다.
또한, onClick 이벤트 핸들러가 발생할때, name과, email을 초기화 한 후, **this.name.focus();** 를 통해, 포커스를 준 것을 확인 할 수 있다.

그러면 비슷한 방법의 ref를 사용하는 예제를 보자.

### createRef

클래스형 컴포넌트에서는 리액트에서 내장된 기능인 createRef를 사용하고, 함수형 컴포넌트에서는 useRef를 사용합니다.

이 둘에 대한 차이는 잠시 미뤄 두고, 이 포스트에서는 클래스형 컴포넌트에서의 createRef에 대해 알아 보겠다.

#### src/components/CustomTextInput

```js
import React, { createRef } from "react"; //추가

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
    this.name = createRef();
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  initHandler = () => {
    this.setState({
      name: "",
      email: "",
    });
    this.name.current.focus(); //변경
  };

  render() {
    return (
      <div style={{ height: "3000px" }}>
        <input
          type="text"
          value={this.state.name}
          onChange={this.changeHandler}
          placeholder="이름을 입력해주세요."
          name="name"
          ref={this.name} //변경
        />
        <input
          type="text"
          value={this.state.email}
          onChange={this.changeHandler}
          placeholder="이메일을 입력해주세요."
          name="email"
        />
        <button onClick={this.initHandler}>초기화</button>
      </div>
    );
  }
}

export default CustomTextInput;
```

> React는 컴포넌트가 마운트 될때 DOM 요소와 함께 ref콜백을 호출하여, 언마운트 될때 null과 함께 호출 된다. ref 콜백은 componentDidMount 나 componentDidUpdate 라이프사이클 훅 전에 호출 된다.

프로젝트 실행을 하여, 브라우저에서 확인해 보자.
텍스트를 입력 후, 버튼을 클릭했을 때, state값이 초기화 되며, name input에 focus가 되었다면, 정상적으로 작동하는 것이다.

### 클래스 컴포넌트에 Ref 추가하기

Ref는 DOM에 추가 뿐만 아니라, 컴포넌트에도 Ref를 추가 할 수 있다.

클래스로 선언된 커스텀 컴포넌트에서 ref속성을 사용할 때, 마운트 된 컴포넌트의 인스턴스가 ref 콜백의 인수로 넘겨진다.
다음 예제를 통하여, 마운트된 직후에 클릭된 것 처럼 동작 시켜보자.

```js
import React, { createRef } from "react";

//추가
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.name.initHandler();
  }

  render() {
    return <CustomTextInput ref={(ref) => (this.name = ref)} />;
  }
}
class CustomTextInput extends React.Component {
  // ...동일
}

export default AutoFocusTextInput;
```

작성이 완료되었다면, 브라우저에서 확인해보자.
렌더링 후, 포커스가 name에 잡힌다면 정상적으로 작동하고 있는 것이다.

클래스 컴포넌트에 Ref를 추가할때, CustomTextInput이 클래스로 선언된 경우에만 동작한다는 사실을 알아두자.

### 마치며

이번 포스트에서는 DOM에 직접적인 접근을 하기 위해, DOM API가 아닌 리액트의 ref을 사용하는 이유 및 사용하는 방식에 대해 알아 보았다.

이처럼 ref의 사용방법은 간단해 보이지만, ref를 통해 연결된 것들이 많다면 추후에 유지보수 하기가 까다로워 지기때문에, 꼭 필요한 경우가 아니라면 ref의 사용은 자제 해야 한다.

참고 : [https://ko.reactjs.org/docs/refs-and-the-dom.html](https://ko.reactjs.org/docs/refs-and-the-dom.html)

# 블로그 링크

> https://dlsgh120.tistory.com/43
