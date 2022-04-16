import React from "react";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';
import { theme } from '../styles/theme';

interface Props{
    Component: any;
    pageProps: any;
}

class App extends React.Component<Props>{
    render(){
        const {Component, pageProps} = this.props;
        return(
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        );
    }
}

export default App;