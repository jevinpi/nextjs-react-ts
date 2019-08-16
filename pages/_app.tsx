import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import 'styles/reset.less';
import 'styles/app.scss';
import 'styles/app.less';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidCatch(error) {
        throw error;
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container class="jevin">
                <Head>
                    <title>ASCS</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default MyApp;
