import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import 'antd/dist/antd.css';
import {createStore, applyMiddleware, combineReducers} from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import Reducer from "./_reducers"

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    //Redux DevTools를 사용하기 위해 세팅
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  
    )}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
