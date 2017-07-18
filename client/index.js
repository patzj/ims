import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ,
    document.getElementById('root'));
