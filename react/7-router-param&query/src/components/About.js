import React from "react";
import queryString from "query-string"; //추가

class About extends React.Component{
    render(){
        // params
        console.log(this.props.match) // 콘솔에서 확인해보자.

        // query
        console.log(this.props.location.search); // 결과: ?name=choi

        const query = queryString.parse(this.props.location.search); //추가
        console.log(query); // 결과: { name: choi }

        return(
            <div>
                this is About Component
                <h1>{this.props.match.params.name}</h1>
                <h1>{this.props.match.params.age}</h1>

                //추가
                {query.detail==="true"&&
                <div>
                    <p>주소: 서울특별시</p>
                    <p>Phone: 010-0000-0000</p>
                </div>}
            </div>
        );
    }
}

export default About;