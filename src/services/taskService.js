
const URL_BASE = 'http://localhost:3000/';

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const listTask = (status, type, order) => {
    const url = URL_BASE + 'tasks/findAll';

    let body = {};
        
    if(type) { body.type = type }
    if(status) {body.status = status}
    if(order) {body.order = order}

    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: HEADERS
    }).then(response =>  response.json())
    .then(json => {
        if(!json.ok){ return Promise.reject(json.err) }

        return Promise.resolve(json.data);
    })
    .catch(err => { return Promise.reject(err); })
}

export const getTaskById = (id) => {
    const url = URL_BASE + 'tasks/'+ id;

    return fetch(url,{
        method: 'GET',
        headers: HEADERS
    }).then(response =>  response.json())
    .then(json => {
        if(!json.ok){ return Promise.reject(json.err) }

        return Promise.resolve(json.data);
    })
    .catch(err => { return Promise.reject(err); })
}

export const createTask = (body) => {
    const url = URL_BASE + 'tasks';

    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: HEADERS
    }).then(response =>  response.json())
    .then(json => {
        if(!json.ok){ return Promise.reject(json.err) }

        return Promise.resolve(json.data);
    })
    .catch(err => { return Promise.reject(err); })
}

export const updateTask = ( id, body) => {
    const url = URL_BASE + 'tasks/'+ id;

    return fetch(url,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers: HEADERS
    }).then(response =>  response.json())
    .then(json => {
        if(!json.ok){ return Promise.reject(json.err) }

        return Promise.resolve(json.data);
    })
    .catch(err => { return Promise.reject(err); })
}

export const deleteTask = (id) => {
    const url = URL_BASE + 'tasks/'+ id;

    return fetch(url,{
        method: 'DELETE',
        headers: HEADERS
    }).then(response =>  response.json())
    .then(json => {
        if(!json.ok){ return Promise.reject(json.err) }

        return Promise.resolve(json.data);
    })
    .catch(err => { return Promise.reject(err); })
}