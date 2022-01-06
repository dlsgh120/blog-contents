# 리액트 컴포넌트의 이벤트 연결(Binding)에 대하여

## 개요

이번 포스트에서는 React 컴포넌트에 이벤트를 연결하는 바인딩하는 법에 대해 알아 보겠습니다.
바인딩에 대해 알아보기전 javascript의 this의 개념에 대한 이해도가 필요합니다. 그 이유는 바인딩은 React만의 특수한 동작이 아니고, javascript에서 함수가 작동하는 방식이기 때문입니다.

> 참조: [https://ko.reactjs.org/docs/faq-functions.html](https://ko.reactjs.org/docs/faq-functions.html)

## javascript 에서의 binding

```js
var obj = {
  title: "hello world",
  sayHello: function () {
    console.log(this.title);
  },
};

obj.sayHello(); // hello world
```

코드가 작동하면, 위의 결과는 console 에 "hello world"가 출력됩니다.

그러면 다른 예제 코드를 보겠습니다.

```js
var obj = {
  title: "hello world",
  sayHello: function () {
    console.log(this.title);
  },
};

var reference = obj.sayHello;
reference(); // undefined
```

이 코드의 결과는 어떻게 될까요?
결과는 undefined로 나올 것입니다. 그 이유는 reference의 변수에 담길때, obj와의 관계가 상실되기 때문입니다.
이와같은 상황에서 필요한 것이 binding 입니다.

javascript 에서 올바른 binding 사용은 다음과 같습니다.

```js
var obj = {
  title: "hello world",
  sayHello: function () {
    console.log(this.title);
  },
};

var reference = obj.sayHello.bind(obj);
reference(); // hello world
```

이와 같이 reference의 변수에 담을때, obj를 바인딩 시켜주면 됩니다.

리액트에서도 javascript의 this가 사용되기 때문에 biding이 필요합니다.
