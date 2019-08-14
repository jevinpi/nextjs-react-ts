const model = {
    namespace: 'app',
    state: {
        count: 0,
    },
    reducers: {
        add(state) {
            return {
                ...state,
                count: ++state.count,
            };
        },
        minus(state) {
            return {
                ...state,
                count: --state.count,
            };
        },
    },
};

export default model;
