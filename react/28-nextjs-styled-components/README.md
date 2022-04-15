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
