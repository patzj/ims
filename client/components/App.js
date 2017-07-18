import React from 'react';
import { Route } from 'react-router-dom';
import PanelWrapper from '../containers/PanelWrapper';

export const Home = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export const App = () => {
    return (
        <div className="container-fluid">
            <PanelWrapper>
                <Home />
            </PanelWrapper>
        </div>
    );
};

export default App;
