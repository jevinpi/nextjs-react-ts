const model = {
    namespace: 'app',
    state: {
        past: [],
        count: 0,
        pre: [],
        undoDisabled: true,
        redoDisabled: true,
        visibility: 'all',
        todos: [
            {
                text: 'todo 1',
                completed: false,
                id: 1,
            },
            {
                text: 'todo 2',
                completed: false,
                id: 2,
            },
            {
                text: 'todo 3',
                completed: true,
                id: 3,
            },
            {
                text: 'todo 4',
                completed: false,
                id: 4,
            },
        ],
    },
    reducers: {
        undo(state) {
            const n = state.past.pop();
            state.pre.push(n);
            return {
                ...state,
                count: n,
                undoDisabled: state.past.length === 0,
                redoDisabled: state.pre.length === 0,
            };
        },
        redo(state) {
            const n = state.pre.pop();
            state.past.push(n);
            return {
                ...state,
                count: n,
                undoDisabled: state.past.length === 0,
                redoDisabled: state.pre.length === 0,
            };
        },
        add(state) {
            console.log(state.past);
            state.past.push(state.count);
            return {
                ...state,
                pre: [],
                count: ++state.count,
                undoDisabled: false,
                redoDisabled: true,
            };
        },
        minus(state) {
            state.past.push(state.count);
            return {
                ...state,
                pre: [],
                count: --state.count,
                undoDisabled: false,
                redoDisabled: true,
            };
        },
        toggleVisibility(state, { payload: visibility }) {
            return {
                ...state,
                visibility,
            };
        },
        toggleAll(state) {
            return state;
        },
        toggleCompleted(state) {
            return {
                ...state,
                todos: state.todos.filter(t => t.completed),
            };
        },
        toggleUnCompleted(state) {
            return {
                ...state,
                todos: state.todos.filter(t => !t.completed),
            };
        },
    },
};

export default model;
