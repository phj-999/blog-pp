import * as actionTypes from './constants';

export default function Previewreducer(state=[],action) {
    switch (action.type) {

        case actionTypes.GET_NEWSPREVIEW:
            
            return {...state,newspreview: action.newSdata}
    
        default:
            return state;
    }
}