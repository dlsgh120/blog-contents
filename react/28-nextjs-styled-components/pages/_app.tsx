import React from "react";

interface Props{
    Component: any;
    pageProps: any;
}

class App extends React.Component<Props>{
    render(){
        const {Component, pageProps} = this.props;
        return(
            <>
            <Component {...pageProps} />
            </>
        );
    }
}

export default App;