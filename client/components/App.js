import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PanelWrapper from '../containers/PanelWrapper';

import Items from '../routes/Items';
import Transactions from '../routes/Transactions';
import Logs from '../routes/Logs';
import UserMgmt from '../routes/UserMgmt';
import Header from '../containers/Header';

export const Main = () => {
    return (
        <div>
            <Header />
            <NavBar />
            <Route path="/items" component={Items} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/logs" component={Logs} />
            <Route path="/user-mgmt" component={UserMgmt} />
        </div>
    );
};

export const App = () => {
    return (
        <div className="container">
            <PanelWrapper>
                <Main />
            </PanelWrapper>
        </div>
    );
};

export default App;
