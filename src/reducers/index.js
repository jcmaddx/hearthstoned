import { combineReducers } from 'redux';
import hsReducer from './hsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  hsReducer,
  routing: routerReducer
});

export default rootReducer;