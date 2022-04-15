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

// Server Side Rendering (동적 요청 시, html 생성)
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

// Static Generation (정적, build시 html 생성)

// export async function getStaticPaths(){
//     const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     const posts = res.data;

//     const paths = posts.map(({ id }: Props) => ({
//         params: { id: String(id) },
//       }));

//     return {paths, fallback:false}
// }

// export async function getStaticProps({params}){
//     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
//     const data = res.data;

//     return{
//         props:{post:data}
//     }
// }

export default PostDetail;