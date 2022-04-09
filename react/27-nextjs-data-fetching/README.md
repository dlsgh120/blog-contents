# Next.js 외부 Data 가져오기(Fetching)

### 개요

이번 포스트는 이전 포스트의 내용에서 이어 설명하기 때문에, 저번 포스트에 대한 내용을 읽지 않았다면 [Tistory](https://dlsgh120.tistory.com/60) 또는 [Github](https://github.com/dlsgh120/blog-contents/tree/main/react/26-Next-Dynamic-URL)에 작성된 글을 먼저 보도록 하자.

Next.js 9.3 이전 버전 까지는 Data Fetching을 하기 위해 getInitialProps 하나로 사용 되었지만, 이후 버전 부터는 **getStaticProps**, **getStaticPaths**, **getServerSideProps** 세가지로 세분화 되었다.

이 세가지에 대해 알아보기 전, Next.js 의 중요한 컨셉중 하나인 Pre-rendering에 대해 먼저 살펴 보겠다.

### Pre-rendering

기본적으로 Next.js의 모든 페이지는 Pre-rendering 되는데, 이것은 Next.js가 각각의 HTML 페이지를 생성한다는 것을 의미 한다.

그렇기에 Pre-rendering은 보다 더 좋은 성능과 SEO를 자랑한다.

React와 같은 Client-side Rendering은 각각의 페이지를 생성하는 것이아닌, 페이지에 있는 데이터를 Javascript가 그려 준다.

각각의 생성된 HTML은 각 페이지에 필요로 하는 최소한의 Javascript로 이루어 져 있으며, 브라우저에서 페이지를 불러올 때 Javascript 코드가 실행 되며 인터렉티브를 생성 한다.

Javascript 코드가 동작하면서 인터렉션을 생성하는 과정을 hydration 이라 부른다.

순수 React 앱이라면 Pre-rendering이 되지 않기 때문에, Javascript를 disable(비활성화) 시키면 아무것도 볼 수 없을 것이다.

### Pre-rendering VS No Pre-rendering

아래 그림을 보며 차이점을 살펴보자.

![image](./images/image1.png)

### 두가지 방식의 Pre-rendering

Next.js는 두가지 형태의 Pre-rendering 방식이 있다. 이는 페이지에 대한 HTML을 언제 생성하는지에 따라 차이가 있다.

#### 1. Static Generation

빌드 시 HTML를 생성하며, 각 요청에 따라 재 사용 된다.

![image](./images/image2.png)

#### 2. Server-side Rendering

각 요청에 따라 HTML를 생성한다.

![image](./images/image3.png)

위와 같이 Next.js에서는 각각의 페이지에 대해 어떠한 Pre-rendering 방식을 사용할 지 결정 할 수 있다.

### 그렇다면 언제 Static Generation과 Server-side Rendering을 사용 할까?

우선 Server-side Rendering 방식 보다 Static Generation 방식이 빠르다.

그 이유는 매번 서버가 모든 요청에 대해 페이지를 렌더링 하는 것 보다는 빌드 시 HTML를 생성하기 때문에 미리 만들어 져 있는 페이지를 볼 수 있다.

하지만 무조건 빠르기 때문에 Static Generation 방식을 사용 하는 것은 아니다.

Static Generation 방식은 주로 **마케팅**, **블로그 포스트** 등 정적인 페이지를 생성 할때 사용하는 것이 올바르다.

그렇기에 어떠한 방법을 사용할지는 스스로 판단을 하고 상황에 맞게 사용하는 것이 바람직하다. (사용자 요청하기 전에 페이지를 미리 생성해 두어도 되는 것인지)

만약, 데이터가 업데이트 되거나, 컨텐츠가 매 요청마다 달라지는 경우는 Server-side Rendering 방식을 사용해야한다.

이는 조금 느리지만, 항상 최신의 데이터를 보여준다.

이제, Next.js에서 Pre-rendering에 대해 알아보았으니, 이를 어떻게 사용하는지에 대해 알아보자.

### getStaticProps를 이용한 Data fetching

우선, 코드는 이전 포스트에서 사용한 코드에 추가로 적용 하겠다.

또한, 외부 Data는 **https://jsonplaceholder.typicode.com/** 에서 제공하는 더미 데이터를 사용할 것이다.

component 폴더의 Header.tsx 파일을 다음과 같이 변경해보자.

#### component/Header.tsx

```js
import Link from "next/link";

const Header = () =>{
    return(
        <div style={{borderBottom:'1px solid #000'}}>
            <Link href="/" >
                <a style={{marginRight: '20px'}}>홈</a>
            </Link>
            <Link href="/about" as={"/about"}>
                <a style={{marginRight: '20px'}}>소개</a>
            </Link>
            <Link href="/post">
                <a style={{marginRight: '20px'}}>post</a>
            </Link>
        </div>
    );
}

export default Header;
```

그리고 만약 pages 폴더 내부에 post.tsx 파일이 존재한다면 삭제 하자.
삭제 후, post 폴더를 만든 후 index.tsx 파일을 만들고 다음과 같이 코드를 작성하자.

그리고 외부 Data를 fetching 하기 위하여 다음과 같이 axios 라이브러리를 설치 해야한다.

```js
npm install axios
```

#### pages/post/index.tsx

```js
import Layout from "../../components/Layout";
import axios from "axios";

interface Props{
    body:string;
    id:number;
    title:string;
    userId:number;
}
const Post = (props:{posts:Props[]}) =>{
    const {posts} = props;
    return(
        <Layout>
            {posts.map((item)=>
            <div key={item.id}>
                <p>id : {item.id} </p>
                <div>
                    {item.title}
                </div>
            </div>
            )}    
        </Layout>
    );
}

export async function getStaticProps(){
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;

    if(!posts){
        return{
            notFound:true,
        }
    }

    return{
        props:{
            posts
        },
        revalidate:1,
    };
}

export default Post;
```

위와 같이 작성이 완료 되었다면 /post 경로로 이동해보자.

해당 post의 list 들이 화면에 보일 것이다.

만약 getStaticProps 에 대한 동적인 라우팅이 필요로 한다면 HTML 빌드 타임에 렌더 해 놓은 paths의 lists가 정의 되어 있어야 한다.

### getStaticPaths

이 방법도 getStaticProps와 유사한 방법으로, 빌드 했을 경우에 HTML이 생성되는 방법 이다.

다음 예시를 통해 알아보자.

우선 pages 폴더 내부에 post폴더 내부에 [id].tsx 파일을 만든 후 다음과 같이 코드를 작성하자.

### pages/post/[id].tsx

```js
import Layout from "../../components/Layout";
import axios from "axios";

interface Props{
    body:string;
    id:number;
    title:string;
    userId:number;
}

const PostDetail = ({post}:{post:Props}) =>{
    return(
        <Layout>
            <p>id : {post.id}</p>
            <p>userId : {post.userId}</p>
            <h1>{post.title}</h1>
            <div>
                {post.body}
            </div>
        </Layout>
    );
}

export async function getStaticPaths(){
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;

    const paths = posts.map(({ id }: Props) => ({
        params: { id: String(id) },
      }));

    return {paths, fallback:false}
}

export async function getStaticProps({params}){
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
    const data = res.data;

    return{
        props:{post:data}
    }
}
export default PostDetail;
```

위와 같이 작성이 완료 되었다면, pages/post/index.tsx 파일에 라우팅을 위한 Link를 추가 해야한다.

#### pages/post/index.tsx

```js
import Layout from "../../components/Layout";
import axios from "axios";
import Link from "next/link"; // 추가

interface Props{
    body:string;
    id:number;
    title:string;
    userId:number;
}
const Post = (props:{posts:Props[]}) =>{
    const {posts} = props;
    return(
        <Layout>
            {posts.map((item)=>
            <div key={item.id}>
                {/* // 변경 */}
                <Link href="/post/[id]" as={`/post/${item.id}`}>
                    <a style={{color: '#000', textDecoration: 'none'}}>
                        <p>id : {item.id} </p>
                        <div>
                            {item.title}
                        </div>
                    </a>
                </Link>
            </div>
            )}    
        </Layout>
    );
}

export async function getStaticProps(){
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;

    if(!posts){
        return{
            notFound:true,
        }
    }

    return{
        props:{
            posts
        },
        revalidate:1,
    };
}

export default Post;
```

이제 해당 Link를 클릭 하여 동적 라우팅이 잘 수행 되는지 확인해보자.

여기서 명심하셔야 할 부분이 있다.

develop mode 에서는 getStaticPaths가 모든 요청 때마다 실행 되지만, production mode 에서는 빌드 시 실행 된다.

다음 명령어를 빌드 명령어를 실행하여, 해당 HTML 파일이 생성 되는 것을 확인해 보자.

```js
npm run build
```

명령어를 실행하면 다음과 같이 해당 텍스트 들이 나올 것이다.

```js
info  - Creating an optimized production build
info  - Compiled successfully 
info  - Collecting page data  
info  - Generating static pages (106/106)
info  - Finalizing page optimization  

Page                              Size     First Load JS
┌ ○ /                             1.94 kB          65 kB
├   /_app                         0 B              63 kB
├ ○ /404                          3.03 kB        66.1 kB
├ ○ /about                        1.83 kB        64.9 kB
├ λ /api/hello                    0 B              63 kB
├ ○ /blog/[id]                    1.81 kB        64.8 kB
├ ● /post (ISR: 1 Seconds)        1.84 kB        64.9 kB
└ ● /post/[id]                    1.84 kB        64.9 kB
    ├ /post/1
    ├ /post/2
    ├ /post/3
    └ [+97 more paths]
+ First Load JS shared by all     63 kB
  ├ chunks/commons.ba07cb.js      13.4 kB
  ├ chunks/framework.ae602c.js    41.8 kB
  ├ chunks/main.7c336f.js         6.64 kB
  ├ chunks/pages/_app.3bc681.js   529 B
  ├ chunks/webpack.50bee0.js      751 B
  └ css/6e9ef204d6fd7ac61493.css  194 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```

빌드가 완료 되었다면 **.next/server/pages/post** 경로로 들어가서 확인해보자.

paths의 id에 해당하는 HTML들이 생성 되었는 것을 확인할 수 있다.

이러한 방식으로 빌드 시점으로 HTML이 생성되는 Static Generation 방식에 대해 간단히 알아보았다.

이제 다른 방식인 각 요청에 따라 HTML이 생성되는 Server-side Rendering 에 대해 알아보자.

### getServerSideProps를 이용한 Data fetching

getServerSideProps는 Next.js 에서 각각의 페이지에 요청마다 HTML를 생성하는 Pre-rendering 을 수행한다.

우선 기존 **pages/post/[id].tsx** 폴더에서 Static Generation 방식으로 한 코드를 Server-side-rendering 방식으로 변경 할 것이다.

코드를 다음과 같이 변경하여, 동적 라우팅 된 해당 post의 id값을 가져올 것이다.

#### pages/post/[id].tsx

```js
import Layout from "../../components/Layout";

interface Props{
    body:string;
    id:number;
    title:string;
    userId:number;
}

const PostDetail = ({query}) =>{
    console.log(query);
    return(
        <Layout>
            
        </Layout>
    );
}

// 추가
export async function getServerSideProps(context){
    const query = context.query;

    if(!query){
        return{
            notFound:true,
        };
    }
    return{
        props:{
            query
        }
    }
}
export default PostDetail;
```

위와 같이 코드 작성이 완료 되었다면, Link를 통해 [id].tsx 페이지로 경로를 이동 시킨 후 콘솔을 열어 해당 id가 잘 출력되는지 확인해보자.

그다음 이전에 사용했던 Static Generation 방식과 같이 동일한 `https://jsonplaceholder.typicode.com` 에서 제공하는 API를 사용하여, id에 대한 post의 Object를 가져올것 이다.

다음과 같이 코드를 변경해보자.

```js
import Layout from "../../components/Layout";
import axios from "axios";

interface Props{
    body:string;
    id:number;
    title:string;
    userId:number;
}

const PostDetail = ({data}:{data:Props}) =>{
    return(
        <Layout>
            <p>id : {data.id}</p>
            <p>userId : {data.userId}</p>
            <h1>{data.title}</h1>
            <div>
                {data.body}
            </div>
        </Layout>
    );
}
export async function getServerSideProps(context){
    const query = context.query;
     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
    const data = res.data;

    if(!query){
        return{
            notFound:true,
        };
    }
    return{
        props:{
            data
        }
    }
}
export default PostDetail;
```

위와 같이 코드가 작성되었다면, 브라우저에서 확인해보자.

해당 post id에 대한 데이터가 화면에 잘 나올 것이다.

위와같이 getServerSideProps를 사용하여 Pre-rendering 하는 방법을 알아보았다.

### 요약

Next.js에서는 2가지의 Pre-rendering 방식을 가진다.

Static Generation 방식과, Server side rendering 방식을 가지고 있으며, 이는 언제 페이지의 HTML 파일을 생성하는지에 따라 다르게 동작한다.

반드시 기억해야 되는 부분은 Static Generation 방식은 빌드 시 HTML 파일이 생성되며, Server side rendering 방식은 요청 시 HTML을 생성한다.
그렇기에, Static Generation 방식이 Server side rendering 보다 빠르게 동작한다.

만약 데이터가 계속해서 변화가 이루어 진다면 Server side rendering 를 사용하는 것이 올바르며, 데이터가 변하지 않는 정적 페이지 같은 경우는 Static Generation을 사용하는것이 바람직하다.

# 블로그 링크

> https://dlsgh120.tistory.com/61
