import Link from 'next/link';
import DvaConnect from '../utils/store';
import React, { useEffect } from 'react';
import { Button } from 'antd';
import 'antd/lib/button/style';
import { createSelector } from 'reselect';

/**
 * 16.8的数据组件
 */

function getTodosByVisibility(todos, filter) {
    switch (filter) {
        case 'Completed':
            return todos.filter(t => t.completed);
        case 'UnCompleted':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

const getVisibility = state => state.visibility;
const getTodos = state => state.todos;

const getVisibileTodos = createSelector(
    [getVisibility, getTodos],
    (visibility, todos) => {
        switch (visibility) {
            case 'Completed':
                return todos.filter(t => t.completed);
            case 'UnCompleted':
                return todos.filter(t => !t.completed);
            default:
                return todos;
        }
    }
);

function Index(props) {
    function calc(type: string) {
        props.dispatch({
            type: `app/${type}`,
        });
    }

    function toggleShow(type: string) {
        props.dispatch({
            type: `app/toggleVisibility`,
            payload: type,
        });
    }

    useEffect(() => {
        console.log('this is hook');
    });
    const { count, showtodos, undoDisabled, redoDisabled } = props;
    return (
        <div className="container">
            <div className="operate-box">
                <p>自己写的撤销重做，Count计数器：</p>
                <Button type="primary" onClick={() => calc('add')}>
                    add
                </Button>
                <Button onClick={() => calc('minus')}>minus</Button>
                <Button
                    disabled={undoDisabled}
                    onClick={() => props.dispatch({ type: 'app/undo' })}
                >
                    撤销
                </Button>
                <Button
                    disabled={redoDisabled}
                    onClick={() => props.dispatch({ type: 'app/redo' })}
                >
                    重做
                </Button>
                <span style={{ paddingLeft: '20px' }}>{count}</span>
            </div>
            {/* 操作按钮 */}
            <div className="operate-box">
                <Button type="primary" onClick={() => toggleShow('All')}>
                    显示全部
                </Button>
                <Button type="primary" onClick={() => toggleShow('Completed')}>
                    显示未完成
                </Button>
                <Button type="primary" onClick={() => toggleShow('UnCompleted')}>
                    显示已完成
                </Button>
            </div>
            <ul className="todos-list">
                {showtodos.map((todo, idx) => (
                    <li key={idx}>
                        <span>{todo.text}</span>
                        <span className="todo-status">{todo.completed ? '已完成' : '未完成'}</span>
                    </li>
                ))}
            </ul>
            <div>
                链接：
                <Link href="second">
                    <a>go to /second</a>
                </Link>
            </div>
        </div>
    );
}

export default DvaConnect(state => {
    const { count, todos, visibility, undoDisabled, redoDisabled } = state.app;
    return {
        count,
        todos,
        visibility,
        undoDisabled,
        redoDisabled,
        showtodos: getTodosByVisibility(state.app.todos, state.app.visibility),
    };
})(Index);
