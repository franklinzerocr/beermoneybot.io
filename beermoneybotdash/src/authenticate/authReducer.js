import {SET_CURRENT_USER} from './currentUser.js'
import isEmpty from './validationReducer.js'

export default function reducer(state , action ){
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}
