import Link from 'next/link';
import DvaConnect from '../utils/store';
import React from 'react';
import { Button } from 'antd';
import 'styles/app.scss';
import 'styles/app.less';
import 'antd/lib/button/style';

function Index(props) {
    function calc(type) {
        props.dispatch({
            type: `app/${type}`,
        });
    }
    return (
        <div>
            <p>首页11</p>
            <p>{props.count}</p>
            <div>
                <Button type="primary" onClick={() => calc('add')}>
                    add
                </Button>
                <Button onClick={() => calc('minus')}>minus</Button>
            </div>
            <Link href="second">
                <a>go to /second</a>
            </Link>
        </div>
    );
}

export default DvaConnect(state => {
    return {
        count: state.app.count,
    };
})(Index);
