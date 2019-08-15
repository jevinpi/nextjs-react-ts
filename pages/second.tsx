import Link from 'next/link';
import React from 'react';

class Sec extends React.Component<any, any> {
    /**
     * 服务端初始化钩子，用来处理异步数据
     */
    static async getInitialProps() {
        return {
            company: 'ASCS',
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        return (
            <div>
                <p>第二页, company: {this.props.company}</p>
                <Link href="index">
                    <a>go to /index</a>
                </Link>
            </div>
        );
    }
}

export default Sec;
