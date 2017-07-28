import { getLogs, exportLogs } from '../controllers/logs-controller';

export const logsRoute = app => {
    app.get('/api/logs', getLogs);
    app.get('/api/logs/export', exportLogs);
};

export default logsRoute;
