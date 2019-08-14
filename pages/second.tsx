import Link from 'next/link';
import React from 'react';
import { Button } from 'antd';

class Sec extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <p>第二页</p>
                <Button>default</Button>
                <Link href="index">
                    <a>go to /index</a>
                </Link>
            </div>
        );
    }
}

export default Sec;
