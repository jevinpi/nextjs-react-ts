import undoable from 'redux-undo';

const demo2 = {
    namespace: 'demo2',
    state: {
        num: 0,
    },
    reducers: [
        {
            add(state) {
                return {
                    num: state.num + 1,
                };
            },
            minus(state) {
                return {
                    num: state.num - 1,
                };
            },
        },
        undoable,
    ],
};

export default demo2;
