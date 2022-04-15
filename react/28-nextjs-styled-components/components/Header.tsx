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