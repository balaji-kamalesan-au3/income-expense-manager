import axios from 'axios';

import {GET_DATA} from './types'

export const getData = () => dispatch => {
    const token = localStorage.getItem("jwtToken")
    axios
        .post("/api/data/getdata",{headers : {"Authorization" : token}})
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

export const postIncome = (income) => dispatch => {
    const token = localStorage.getItem("jwtToken");
 
    axios
        .post("/api/data/addIncome",income,{headers : {"Authorization" : token}})
        .then(
            () => {
                dispatch(getData());
            }
        )
        .catch((err) => console.log(err))

}

export const postExpense = (expense) => dispatch => {
    const token = localStorage.getItem("jwtToken");

    axios
        .post("/api/data/addExpense",expense,{headers : {"Authorization" : token}})
        .then(
            () =>  { dispatch(getData()); }
        )
        .catch ((err) => console.log(err));

}

