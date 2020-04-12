import axios from 'axios';

import {GET_DATA,GET_ERRORS} from './types'

export const getData = () => dispatch => {
    const token = localStorage.getItem("jwtToken")
    axios
        .post("/api/data/getdata",{headers : {"Authorization" : token}})
        .then(data => {
            dispatch(setData(data.data))
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              })
        })
}

export const setData = data => {
    return {
        type : GET_DATA,
        payload : data
    }
}

export const postIncome = (income) => dispatch => {
    const token = localStorage.getItem("jwtToken");
 
    axios
        .post("/api/data/addIncome",income,{headers : {"Authorization" : token}})
        .then(
            () => {
                dispatch(getData());
            }
        )
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              })
        })

}

export const postExpense = (expense) => dispatch => {
    const token = localStorage.getItem("jwtToken");

    axios
        .post("/api/data/addExpense",expense,{headers : {"Authorization" : token}})
        .then(
            () =>  { dispatch(getData()); }
        )
        .catch ((err) =>
            {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                  })
            }
        );

}

