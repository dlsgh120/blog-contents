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