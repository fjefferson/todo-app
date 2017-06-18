import { TASK_UNDONE_SEARCHED, TASK_DONE_SEARCHED, TASK_ENTITY_CHANGED, TASK_ADDED, TASK_REMOVED, TASK_DONE_TOGGLE } from './actions';

const INITIAL_STATE = {
    entity: {
        _id: null,
        description: '',
        done: null,
        createAt: null,
        doneAt: null
    },
    undone: [],
    done: []
}

export const task = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TASK_UNDONE_SEARCHED:
            return { ...state, undone: action.payload };
        case TASK_DONE_SEARCHED:
            return { ...state, done: action.payload };
        case TASK_ENTITY_CHANGED:
            return { ...state, entity: action.payload };
        case TASK_ADDED:
            return { ...state, entity: INITIAL_STATE.entity };
        case TASK_REMOVED:
            return state;
        case TASK_DONE_TOGGLE:
            return state;
        default:
            return state;
    }
} 