import Layout from "../components/Layout";
import {useRouter} from "next/router";

const Post = () =>{
    const router = useRouter();

    return(
        <Layout>
            <h1>{router.query.title}</h1>
        </Layout>
    )
}

export default Post;