import axios from 'axios';

import {GET_DATA} from './types'

export const getData = id => dispatch => {
    const token = localStorage.getItem("jwtToken")
    axios
        .post("/api/data/getdata",{headers : {"Authorization" : token}},id)
        .then(data => {
            dispatch(setData(data.data))
        })
}

export const setData = data => {
    return {
        type : GET_DATA,
        payload : data
    }
}