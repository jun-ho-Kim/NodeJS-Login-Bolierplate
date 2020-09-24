import {combineReducers} from 'redux';
import user from "./user_reducer";

const rootReducer = combineReducers({
    user
    // reducer인데 나눠줘 있는 reducer들을 
    // 하나로 합쳐준다.(Combine Reducer)
});

export default rootReducer;