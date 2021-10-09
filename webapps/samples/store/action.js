export const ActionTypes = {
    CLEAR_ALL: 'CLEAR_ALL',
    ACTION_SUBMIT: 'ACTION_SUBMIT',
    ACTION_SUBMIT_FAIL: 'ACTION_SUBMIT_FAIL',
    ACTION_SUBMIT_SUCCESS: 'ACTION_SUBMIT_SUCCESS',
    FETCH_DATA: 'FETCH_DATA',
    FETCH_DATA_FAIL: 'FETCH_DATA_FAIL',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
}

export const actionSubmit = (action, data) => dispatch => {
    let url = '/admin' + (action.startsWith('/') ? '' : '/') + action;
    data = JSON.stringify(data);
    return dispatch({
        type: ActionTypes.ACTION_SUBMIT,
        payload: {
            request: {
                method: 'POST',
                url: url,
                data: data,
            }
        },
    })
}

export const fetchData = (action, data) => dispatch => {
    let url = '/admin' + (action.startsWith('/') ? '' : '/') + action;
    return dispatch({
        type: ActionTypes.FETCH_DATA,
        payload: {
            request: {
                method: 'GET',
                url: url,
                params: data,
            }
        },
    })
}