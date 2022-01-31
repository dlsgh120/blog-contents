import React from "react";
import {withCookies, ReactCookieProps} from "react-cookie";


interface Props extends ReactCookieProps{}
const CookieComponent: React.FC<Props> = ({cookies}) =>{

    const createHandler = () =>{
        const today = new Date();
        today.setDate(today.getDate()+1);

        cookies?.set("cookie","hello", {expires:today});

        // 로컬스토리지 및 세션스토리지 추가
        window.localStorage.setItem("localStorage", "this is localStorage");
        window.sessionStorage.setItem("sessionStorage", "this is sessionStorage");
    }


    const removeHandler = () =>{
        cookies?.remove("cookie");
        // 로컬스토리지 및 세션스토리지 추가
        window.localStorage.removeItem("localStorage");
        window.sessionStorage.removeItem("sessionStorage");
    }
    return(
        <div>
            <button onClick={createHandler}>쿠키 생성</button>
            <button onClick={removeHandler}>쿠키 삭제</button>
            <p>쿠키 Data : {cookies?.get("cookie")?cookies?.get("cookie"):"쿠키없음"}</p>

            // 로컬스토리지 및 세션스토리지 추가
            <p>로컬스토리지 Data : {window.localStorage?.getItem("localStorage")?window.localStorage?.getItem("localStorage"):"로컬스토리지 없음"}</p>
            <p>세션스토리지 Data : {window.sessionStorage?.getItem("sessionStorage")?window.sessionStorage?.getItem("sessionStorage"):"세션스토리지 없음"}</p>
        </div>
    );
}

export default withCookies(CookieComponent);