import Layout from "../components/Layout";
import Link from "next/link";

const PostLink = (props:{title:string}) =>{
  return(
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
  );
}

//추가
const BlogLink = (props:{id:string}) =>{
  return(
    <li>
        <Link href="/blog/[id]" as={`/blog/${props.id}`}>
            <a>{props.id}</a>
        </Link>
    </li>
  );
}

const Home = () =>{
  return (
        <Layout>
            <h1>Post - query parameter</h1>
            <ul>
                <PostLink title="hello,Next.js" />
                <PostLink title="Next.js query parameter" />
                <PostLink title="Next.js is Awesome" />
            </ul>
            {/* // 추가 */}
            <h1>Blog - pathname parameter</h1>
            <ul>
              <BlogLink id="1" />
              <BlogLink id="2" />
              <BlogLink id="3" />
            </ul>
        </Layout>
  )
}

export default Home;