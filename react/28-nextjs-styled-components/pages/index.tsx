import Layout from "../components/Layout";
import Link from "next/link";

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