# Next.js Styled-components 설정 및 사용하기

### 개요

기존 React 앱과 동일한 라이브러리를 설치하여 사용 되지만, Next.js에서는 추가로 설정을 해주어야 하는 것들이 있다.

이번 포스트에서 Styled-components에 대해 알아보기 전, 이전에 작성한 포스트의 코드를 가지고 사용 할 것이다.

하지만 새로 세팅을 해도 상관 없다.

새로 세팅을 위한 설명은 여기서는 생략 할 것이며, 이전 포스트의 코드를 확인은 [Github 링크](https://github.com/dlsgh120/blog-contents/tree/main/react/27-nextjs-data-fetching) 에서 확인 할 수 있다.

### Styled-component 설치

먼저 Next.js에서 스타일링을 하기 전 다음과 같이 설치를 진행해보자.

```js
npm install styled-components
// typescript 추가 설치
npm install --save @types/styled-components
```

설치가 완료 되었다면, components 폴더의 Header.tsx 파일을 다음과 같이 변경할 것이다.

#### components/Header.tsx

```js
import Link from "next/link";
import styled from "styled-components";

const Header = () =>{
    return(
        <HeaderWrap>
            <Link href="/"><LinkStyle>홈</LinkStyle></Link>
            <Link href="/about"><LinkStyle>소개</LinkStyle></Link>
            <Link href="/post"><LinkStyle>post</LinkStyle></Link>
        </HeaderWrap>
    );
}

const HeaderWrap = styled.div`
    border-bottom:1px solid #000;
`;

const LinkStyle = styled.a`
    margin-right:20px;
`;
export default Header;
```

위와 같이 변경이 완료 되었다면, 브라우저에서 확인해 보자.

무언가 이상한 것을 볼 수 있을 것이다.

변경이 되지 않고 콘솔에서 확인하면,  다음과 같은 에러가 발생 한 것을 확인 할 수 있다.

```js
Warning: Prop `className` did not match. Server: "sc-hKgILt hRNbNI" Client: "sc-gsTCUz dLVocF"
```

Next.js 에서는 styled-components를 적용 했을때, className이 달라서 생기는 경고 이다.

Next.js는 초기 렌더링만 서버(SSR) 가 담당 하고, 그 이후에는 서버를 거치지 않은 채 내부 라우팅을 이용해 페이지가 이동 되면서 브라우저에서 렌더링(CSR)을 하게 된다.

그렇기에 첫 화면 로딩시 SSR로 렌더링 하면서 오류가 발생하지 않지만, 그 이후 부터는 CSR로 렌더링 하면서, 서버에서의 클래스명과 클라이언트에서 클래스명이 달라 생기는 오류이다.

이 문제는 **바벨 플러그인** 을 설치 하고, 바벨설정을 추가 함으로써 해결 할 수 있다.

### babel-plugin 설정

바벨 플러그인을 설정 하기 위해 다음과 같이 설치를 하자.

```js
npm install babel-plugin-styled-components
```

설치가 완료 되었다면, root 경로에 **.babelrc** 파일을 추가 하고 다음과 같이 내용을 작성하자.

#### .babelrc

```js
{
   "presets": ["next/babel"],
   "plugins": ["babel-plugin-styled-components"]
}
```

이제, 다시 프로젝트를 실행 시켜 확인 해보면, 스타일이 적용 되었을 것이다.

추가로 babel-plugin-styled-components에 다음과 같이 옵션을 줄 수 있다.

```js
{
   "presets": ["next/babel"],
   "plugins": [
      [
        "babel-plugin-styled-components",
        {
           "ssr": true, 
           "displayName": true,
           "preprocess": false
        }
      ]
   ]
}
```

이제, Next.js 에서 Global Styles를 지정해 줄 것이다.

이 말은, 전체 page에서 스타일을 전역적으로 설정 할 수 있다는 말 이다.

### styled-components 전역적으로 설정하기

스타일을 전역적으로 설정하기 위해, pages 폴더 내부에 _app.tsx 파일을 만들어 설정 할 수 있다.

우선 _app.tsx 파일을 설정하기 전 스타일에 대한 폴더를 생성하여, 전역스타일과 테마에 대해 파일을 생성 할 것이다.

이는, 정해진 방법이 아니고, 내가 주로 사용하는 방법이기에, 더 좋은 방법이 있다면 그렇게 사용해도 상관 없다.

#### styles/global-styles.ts

```js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height:100%;
    margin:0;
    padding:0;
    width:100%;
    background-color: rgb(242, 242, 242);
    color:#333333;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight:300;
  }
`;
```

#### styles/theme.ts

```js
export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
  },
};
```

위와같이 styles폴더 안에 global-styles 파일과, theme 파일을 생성 해준다.

#### pages/_app.tsx

pages의 _app 파일은 다음과 같이 위에 생성된 스타일들을 적용해야 한다.

```js
import React from "react";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';
import { theme } from '../styles/theme';

interface Props{
    Component: any;
    pageProps: any;
}

class App extends React.Component<Props>{
    render(){
        const {Component, pageProps} = this.props;
        return(
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        );
    }
}

export default App;
```

위와 같이 임의로 styled-components 를 전역적으로 설정 해보았다.

프로젝트를 실행하여, 전체 page가 위와 같이 스타일이 전역적으로 설정 되었는지 확인해보자.

하지만 간혹 Next.js 에서 Styled-components 의 적용이 한번씩 안되는 경우가 발생 할 수 있다.

그 이유는 스타일이 적용 전에 렌더링 되어, 스타일링 없이 데이터만 화면에 보이는 것이다.

이를 위한 문제 해결은 pages 폴더 내부에 _document.tsx 파일을 만들어 설정을 하여 해결 할 수 있다.

### styled-components SSR 적용하기

styled-components의 SSR를 적용하기 위해 pages 폴더 내부에 _document.tsx 파일을 만든 후 다음과 같이 작성하자.

#### pages/_document.tsx

```js
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { DocumentContext } from 'next/document';
import { RenderPageResult } from 'next/dist/shared/lib/utils';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<RenderPageResult> {
    // 스타일 구성 요소의 ServerStyleSheet 클래스를 인스턴스화 한다
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // renderPage : 이 메서드에 연결하여 초기 페이지 로드 시 서버 측 자식 구성 요소의 스타일 분석
      // renderPage를 커스텀 하는 이유는 서버 측 렌더링에서 제대로 작동하기 위해 애플리케이션을 래핑해야 하는 css-in-js 라이브러리와 함께 사용하기 위한 것
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      } as RenderPageResult;
    } finally {
      sheet.seal();
    }
  }
}

```

작성이 완료 되셨다면, 프로젝트를 실행 해보자.

Next.js에서 styled-components를 사용을 위한 세팅들이 완료 되었다.

### 마치며

Next.js에서는 기존 React와 달리, 초기에 세팅을 해줘야하는 부분이 있다.

이는 Nextjs는 단순히 CSR이 아니고, SSR으로 동작하고 있어, 처음 화면이 로딩 되었을 때 서버로부터, HTML이 생성되어 화면에 보여지게 되는 것인데,
이과정에서 ClassName이 맞지 않거나 또는 스타일이 적용이 되지않고 데이터만 화면에 보여지는 문제가 발생하기도 한다.

이를 위해 간단히, Next.js에서 Styled-components를 사용하기 위해 초기에 세팅하는 부분에 대해 알아보았다.
