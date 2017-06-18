import Axios from 'axios';

export const TASK_UNDONE_SEARCHED = 'TASK_UNDONE_SEARCHED';
export const TASK_DONE_SEARCHED = 'TASK_DONE_SEARCHED';
export const TASK_ENTITY_CHANGED = 'TASK_ENTITY_CHANGED';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_REMOVED = 'TASK_REMOVED';
export const TASK_DONE_TOGGLE = 'TASK_DONE_TOGGLE';

const URL = 'http://localhost:3003/api/task';

export const changeEntity = (entity) => ({ type: TASK_ENTITY_CHANGED, payload: entity });

export const searchUndone = () => {
    return (dispatch, getState) => {
        let description = getState().task.entity.description;
        let search = description ? `&description__regex=/${description}/gi` : '';
        let uri = `${URL}?sort=-createdAt${search}`;
        Axios.get(`${uri}&done=false`)
            .then(response => dispatch({type: TASK_UNDONE_SEARCHED, payload: response.data}));
    }
};

export const searchDone = (description = '') => {
    return (dispatch, getState) => {
        let description = getState().task.entity.description;
        let search = description ? `&description__regex=/${description}/gi` : '';
        let uri = `${URL}?sort=-doneAt${search}`;
        Axios.get(`${uri}&done=true`)
            .then(response => dispatch({type: TASK_DONE_SEARCHED, payload: response.data}));
    }
};

export const add = entity => { 
    return dispatch => {
        Axios.post(URL, entity)
            .then(response => dispatch({type: TASK_ADDED, payload: response.data}))
            .then(response => dispatch(searchUndone()))
            .then(response => dispatch(searchDone()));
    };
}

export const remove = entity => {
    return dispatch => {
        Axios.delete(`${URL}/${entity._id}`)
            .then(response => dispatch({type: TASK_REMOVED, payload: entity}))
            .then(response => dispatch(searchUndone()))
            .then(response => dispatch(searchDone()));
    }
}

export const doneToggle = entity => {
    return dispatch => {
        Axios.put(`${URL}/${entity._id}`, {
                ...entity, 
                done: !entity.done, 
                doneAt: entity.done ? null : new Date()
            })
            .then(response => dispatch({type: TASK_DONE_TOGGLE, payload: entity}))
            .then(response => dispatch(searchUndone()))
            .then(response => dispatch(searchDone()));
    }
}