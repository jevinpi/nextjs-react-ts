import Link from 'next/link';
import React from 'react';
import { Button } from 'antd';
import DvaConnect from '../utils/store';
import { ActionCreators } from 'redux-undo';

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

    undo() {
        this.props.dispatch(ActionCreators.undo());
    }

    redo() {
        this.props.dispatch(ActionCreators.redo());
    }

    calc(type: string) {
        this.props.dispatch({
            type: `demo2/${type}`,
        });
    }

    render() {
        return (
            <div>
                <p>第二页, company: {this.props.company}</p>
                <p>基于redux-udno撤销重做的count</p>
                <div className="operate-box">
                    <Button type="primary" onClick={() => this.calc('add')}>
                        add
                    </Button>
                    <Button onClick={() => this.calc('minus')}>minus</Button>
                    <Button onClick={() => this.undo()}>撤销</Button>
                    <Button onClick={() => this.redo()}>重做</Button>
                    <span style={{ paddingLeft: '20px' }}>{this.props.num}</span>
                </div>
                <Link href="index">
                    <a>go to /index</a>
                </Link>
            </div>
        );
    }
}

export default DvaConnect(state => {
    return {
        num: state.demo2.present.num,
    };
})(Sec);
