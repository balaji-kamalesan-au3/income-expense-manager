import {GET_DATA} from "../actions/types"


const intialState = {
    data : null
}

export default function(state = intialState,action){
    switch(action.type){
        case GET_DATA :
            return {
                ...state,
                data : action.payload
            }
        default :
            return state;
    }
}
