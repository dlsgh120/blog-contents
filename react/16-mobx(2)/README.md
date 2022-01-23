# Mobx를 적용하여 상태 관리하기 (2)

### 개요

지난 포스트를 이어, 리액트에서 Mobx를 어떻게 설정하고 적용하는지에 대해 알아보자.

### Mobx 설치

먼저, 리액트에서 상태 관리 라이브러리인 Mobx를 적용하기 위해서 설치를 해주셔야 한다.

다음과 같이 설치를 진행해보자.

```js
npm install mobx mobx-react
```

설치가 완료 되었다면, Counter 파일을 만들어 보자.
Mobx를 활용한 예제코드는 다음과 같다.

#### src/components/Counter

```js
import React from "react";
import { makeObservable, observable, action } from "mobx"; // 추가
import { observer } from "mobx-react"; //추가

class Counter extends React.Component {
  number = 0; // observable state

  constructor(props) {
    super(props);
    makeObservable(this, {
      number: observable,
      increase: action,
      decrease: action,
    });
  }

  increase = () => {
    this.number++;
  };

  decrease = () => {
    this.number--;
  };

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    );
  }
}

export default observer(Counter);
// observer이란 Counter 클래스는 Mobx가 observable를 추적하여, 상태의 변화가 일어났을때, 리랜더링을 시키도록 함
```

observable과, action에 대해서는 이전 글에서 설명을 다루었다.

하지만 makeObservable이란 무엇 일까?

Mobx 6 버전 이후 부터는 데코레이터를 사용하지 않고, makeObservable를 사용하는 것으로 권장 하고 있으며, 그 역할을 수행하는 기능 이다.

그리고 마지막에 Counter 클래스를 observer로 감싸주어, 이 클래스에서 Mobx가 observable를 추적하여, 상태 변화가 일어 났을때, 리랜더링을 시켜주는 역할을 한다.

그러면 이코드를 한번 실행해 보자.

Counter 기능이 잘 작동 하는가?

하지만, 아직 많은 곳에서 데코레이터(Decorator) 문법을 많이 사용이 되며, 아주 편한 방법으로 사용할 수 있다.

이에 대해 어떻게 사용하는지 다루어 보자.

데코레이터 문법을 활용한 예제 코드는 다음과 같다.

```js
import React from "react";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react";

@observer // Counter 클래스를 감싸는 observer이 데코레이터를 사용 함으로써 이쪽에 선언
class Counter extends React.Component {
  constructor(props) {
    super(props);
    makeObservable(this);
  }

  @observable //데코레이터 적용
  number = 0; // observable state

  @action //데코레이터 적용
  increase = () => {
    this.number++;
  };

  @action //데코레이터 적용
  decrease = () => {
    this.number--;
  };

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    );
  }
}

export default Counter;
// observer이란 Counter 클래스는 Mobx가 observable를 추적하여, 상태의 변화가 일어났을때, 리랜더링을 시키도록 함
```

makeObservable을 사용하는 것 보다 훨씬 간단해 보이는 걸 확인할 수 있다.

하지만 데코레이터 문법을 사용하기 전에, 에러가 발생 할 것이다.

그 이유는 데코레이터 문법을 사용 할 수 있도록 babel 설정을 해 주어야 하기 때문이다.

**babel**이란 자바스크립트 컴파일러로, ES6이상인 자바스크립트 최신 문법들을 브라우저가 이해할 수 있는 문법으로 변환해주는 역할을 한다.

그렇기에 Mobx를 편하게 데코레이터를 이용하여 사용하기 위해서는 babel 설정이 이루어 져야 한다.

babel을 설정 하기 전 다음과 같이 진행 해 보자.

```js
npm install @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

두개를 설치 한 후, babel을 커스텀 하기 위하여, 프로젝트 eject를 해야한다.

```js
npm run eject
```

명령어 실행 후, y 를 입력 후 진행 해주세요.

```js
npm ERR! Failed at the react-mobx-practice@0.1.0 eject script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

만약 이와 같은 에러가 발생 했을 경우에, 터미널에 다음과 같이 입력 후 다시 eject를 실행 해보자.

```js
git add .
git commit -m "before eject"
```

입력 후 , npm run eject를 하면, babel 설정을 하실 수 있다.

eject가 완료 되었으면, **package.json** 파일을 열어보자.
엄청 많은 것들이 생겼을 것이다.

그럼 여기서 babel 을 찾아보자.

```js
"babel": {
    "presets": [
      "react-app"
    ]
  }
```

이런 모습으로 되어 있다면, 다음과 같이 babel를 변경하자.

```js
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true}],
        ["@babel/plugin-proposal-class-properties", { "loose": true}]
    ]
  }
```

변경이 완료 되었다면, 실행 해보자.

또, 다음과 같은 모듈을 찾을 수 없다고 에러가 발생 할 수도 있다.

만약 발생 하였다면, 해당 모듈을 설치하면 된다.

```js
./node_modules/react-dev-utils/webpackHotDevClient.js
Error: [BABEL] D:workspace
react-mobx-practice
node_modules
react-dev-utilswebpackHotDevClient.js: Cannot find module "@babel/plugin-syntax-class-properties"
Require stack:
- D:workspace
react-mobx-practice
node_modulesabel-preset-react-app
node_modules@babelpreset-envlibavailable-plugins.js
...
...
```

위와같이 @babel/plugin-syntax-class-properties 이와 같은 모듈을 찾을 수 없어 다음과 같이 설치를 하였다.

```js
npm install @babel/plugin-syntax-class-properties
```

이제 실행을 해보자.

데코레이터를 적용하여, 카운트 기능을 수행 하도록 해보았다.

프로젝트 실행은 문제 없이 돌아 갈 것 이지만, 아직도 Counter.js 에서 데코레이터 문법에 대한 다음과 같은 경고가 발생 할 것이다.

```js
데코레이터에 대한 실험적 지원 기능은 이후 릴리스에서 변경될 수 있습니다. 이 경고를 제거하려면 "tsconfig" 또는 "jsconfig"에서 "experimentalDecorators" 옵션을 설정합니다.ts(1219)
```

이 경고를 없애기 위해서는 jsconfig.json 파일을 하나 만들어 다음과 같이 작성하자.

#### jsconfig.json

```js
{
    "compilerOptions": {
      "target": "es5",
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react",
      "experimentalDecorators": true // 이부분이 중요
    },
    "include": [
      "src"
    ]
  }

```

이제 경고창이 사라졌을 것이다.

이러한 방법으로 데코레이터를 활용하여 더욱더 편하게 Mobx를 사용 할 수 있다.

데코레이터를 사용하기 위해, 많은 모듈을 설치를 해야하고, eject를 하여 babel를 설정 해 주기때문에, 번거롭다고 생각할 수 있다.

또한, Mobx 6 버전 이후로 부터는 데코레이터가 아닌 makeObservable을 사용 하는데 왜? 데코레이터를 사용하는지에 대한 의문을 가질 수 있다.

하지만 아직 많은 곳에서 Mobx를 사용할 때, 데코레이터를 사용하여, 더욱 편하게 상태를 관리하는 곳이 많기 때문에, 데코레이터 활용하는 법도 익숙 해지면 좋을 것이다.

다음 포스트에서는 Mobx를 store 폴더를 만들어 분리하여 사용하는 법에 대해 알아보겠다. (실제로는 store로 분리하여 사용함)

### 마치며

mobx를 어떻게 적용 하는지에 대해 알아보았다.

또한, Mobx 6버전 이후로 부터는 데코레이터를 사용하는 것 보다, makeObservable을 사용 하도록 권장 하고 있다.

하지만 아직 많은 곳에서 데코레이터를 많이 사용 하고 있기때문에, 데코레이터를 사용하기 위해, 어떻게 설정을 하고 사용하는지에 대해 알아 보았다.

참고 : [https://mobx.js.org/enabling-decorators.html#enabling-decorators-](https://mobx.js.org/enabling-decorators.html#enabling-decorators-)
