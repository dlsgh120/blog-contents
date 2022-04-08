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