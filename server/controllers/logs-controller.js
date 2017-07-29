import fs from 'fs';
import { error as e } from '../utils/response-util';
import path from 'path';
import mime from 'mime';

export const getLogs = (req, res) => {
    fs.readFile('logs/server.log', 'utf8', function(err, data) {
        if(err) {
            e.serverErr(res);
        } else if(data) {
            const logs = [];
            data.split('\n').forEach(item => {
                if(item.length) {
                    logs.push(JSON.parse(item))
                }
            });
            res.json({
                logs: logs
            });
        }
    });
};

export const exportLogs = (req, res) => {
    const file = path.resolve('./logs/server.log');
    const mimetype = mime.lookup(file);

    res.setHeader('Content-Disposition', 'attachment; filename=server.log');
    res.setHeader('Content-Type', mimetype);
    res.sendFile(file);
};
