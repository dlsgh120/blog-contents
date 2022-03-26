# Next.js 페이지 이동 및 공용 컴포넌트 사용하기

### 개요

Next.js 환경에서 페이지를 이동하는 방법과 공용 컴포넌트를 사용하는 방법에 대해 알아보자.

저번 포스트인 Next.js의 개념에 대한 내용에 이어서 글을 작성 하므로, 이전 내용을 참고 하자.

[Github] (https://github.com/dlsgh120/blog-contents/tree/main/react/24-SSR-CSR-Nextjs)

[Tistory] (https://dlsgh120.tistory.com/58)

라우팅에 대한 내용을 알아보기 전, Next.js 환경 세팅이 되어 있지 않다면, 환경 세팅을 하자.

## 페이지 라우팅

Next.js는 기본적으로 라우터를 내장 하고 있다.

다음과 같이 여러 페이지를 만들어 라우팅 하는법을 알아보자.

pages폴더에 about.tsx 파일을 생성하여 다음과 같이 작성해보자.

### pages/about.tsx

```js
const About = () =>{
    return(
        <div>
            <h1>안녕하세요 최인호의 blog 입니다.</h1>
        </div>
    );
}

export default About;
```

작성이 완료 되었다면, 브라우저에 https://localhost:3000/about 으로 접속해보자.

여기서 짚고 넘어가야 할 부분은 [pages] 폴더 내부에 about.tsx라는 파일 명을 만들었기 때문에, 경로가 "/about" 으로 접근 시 해당 페이지가 나오는 것 이다.

그렇다면 index 페이지에서 링크를 추가 해보자.

### pages/index.tsx

```js
import Link from "next/link"; //추가

const Home = () =>{
  return (
      <div>
         <h1>안녕하세요</h1>
         <h2>
           <Link href="/about">
              <a>소개 보기</a>
           </Link>
         </h2>
      </div>
  )
}

export default Home;
```

Link는 next에서 제공하는 기능으로 위와같이 선언을 하여 사용할 수 있다.

여기서 Link 컴포넌트를 사용 할때, React에서는 react-router을 import 하여 to를 사용하여 라우팅을 하였다면, Next에서는 href를 사용하여 페이지를 이동 시킨다.

또한, 컴포넌트 내부에 문자열이 아닌, 컴포넌트 혹은 엘리멘트가 있어야 한다.

추가로, 스타일링을 할때, 내부 엘리먼트에 style 혹은 className을 사용하면 된다.

반드시 a태그는 사용하지 않아도 되며, 컴포넌트를 넣을때 해당 컴포넌트가 onClick Props를 전달 받아서 실행하도록 해야 한다.

예를 들어 간단히, Link 컴포넌트에 스타일링을 살펴 보겠다.

```js
import Link from "next/link";

const Home = () =>{
  return (
      <div>
         <h1>안녕하세요</h1>
         <h2>
           <Link href="/about">
              <div style={{color:"#FF0000"}}>소개 보기</div>
           </Link>
         </h2>
      </div>
  )
}

export default Home;
```

위와 같이 간단히 스타일링을 할 수 있다.

대부분 웹사이트를 보면, 각 페이지에 보여지는 동일한 Header가 보여 질 것이다.

이제 이에 대한 Header 컴포넌트를 만들어 보자.

### 공용 컴포넌트 만들어보기

우선 components 폴더 내부에 Header.tsx라는 파일을 만들어 다음과 같이 작성 해보자.

### components/Header.tsx

```js
import Link from "next/link";

const headerStyle = {
    marginBottom:"20px",
    borderBottom:"1px solid #000"
}

const linkStyle ={
    marginRight:"20px"
}
const Header = () =>{
    return(
        <div style={headerStyle}>
            <Link href="/"><a style={linkStyle}>홈</a></Link>
            <Link href="/about"><a style={linkStyle}>소개</a></Link>
        </div>
    );
}

export default Header;
```

위와 같이 Header 컴포넌트 작성이 완료 되었다면, Index페이지, about페이지에서 Header.tsx를 불러온 후, 다음과 같이 추가하자.

### pages/index.tsx

```js
import Header from "../components/Header";

const Home = () =>{
  return (
      <div>
        <Header />
         <h1>안녕하세요</h1>
      </div>
  )
}

export default Home;
```

### pages/about.tsx

```js
import Header from "../components/Header";

const About = () =>{
    return(
        <div>
            <Header />
            <h1>안녕하세요 최인호의 blog 입니다.</h1>
        </div>
    );
}

export default About;
```

위와 같이 작성이 완료되었다면, 브라우저를 열어 확인 해보자.

index 및 about 페이지로 이동 시, Header 컴포넌트는 동일하게 나올것이다.

하지만 이러한 방식처럼, Header 컴포넌트가 필요한 모든 페이지마다 불러오는 것 보다는, 각각의 페이지에서 공통적으로 사용할 Layout 컴포넌트를 생성 하여 좀 더 제대로 해결해보자.

components 폴더 내부에 Layout.tsx 파일을 만든 후 다음과 같이 코드를 작성 한다.

### components/Layout.tsx

```js
import React, {ReactNode} from "react";
import Header from "./Header";

type Props = {
    children?: ReactNode
};

const Layout = ({children}:Props) =>{
    return(
        <div>
            <Header />
            {children}
        </div>
    );
}

export default Layout;
```

위와같이 Layout 컴포넌트 작성이 완료 되었다면, index.tsx와 about.tsx 에서 Header를 지워주고 Layout을 불러온 후 다음과 같이 감싸준다.

### pages/index.tsx

```js
import Layout from "../components/Layout";

const Home = () =>{
  return (
      <div>
        <Layout>
          <h1>안녕하세요</h1>
        </Layout>
      </div>
  )
}

export default Home;
```

### pages/about.tsx

```js
import Layout from "../components/Layout";

const About = () =>{
    return(
        <div>
            <Layout>
                <h1>안녕하세요 최인호의 blog 입니다.</h1>
            </Layout>
        </div>
    );
}

export default About;
```

위와 같이 작성이 완료 되었다면, 브라우저를 열어 확인해보자.

위와 같은 방식으로 페이지를 이동 시키며, Header및 Footer 와 같은, 다양한 페이지에서 공통적으로 사용 되는 컴포넌트를 Layout과 같이 공용컴포넌트를 만들어 수행하는 것이 기본적인 방식이다.

### 마치며

Link를 통하여 라우팅하는 방법 및 다양한 페이지에서 공통적으로 사용되는 컴포넌트를 만들어 사용하는 방법에 대해 간단히 알아보았다.

# 블로그 링크

> https://dlsgh120.tistory.com/59