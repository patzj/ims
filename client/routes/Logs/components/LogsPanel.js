import React from 'react';
import LogsTable from '../containers/LogsTable';
import { exportLogs } from '../../../actions/logs-action';

export const LogsPanel = () => {
    return (
        <div className="col-xs-10 col-xs-offset-1">
            <h2 className="pull-left">Logs</h2>
            <div className="pull-right" style={{marginTop: '20px'}}>
                <button className="btn btn-success" onClick={() => exportLogs()}>
                    <span className="glyphicon glyphicon-export"></span>&nbsp;Export
                </button>
            </div>
            <LogsTable />
        </div>
    );
};

export default LogsPanel;
