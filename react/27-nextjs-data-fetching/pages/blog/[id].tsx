import Layout from "../../components/Layout";
import {useRouter} from "next/router";

const Blog = () =>{
    const router = useRouter();
    
    return(
        <Layout>
            <h1>{router.query.id}</h1>
        </Layout>
    );
}

export default Blog;