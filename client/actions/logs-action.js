import axios from 'axios';
import fileDownload from 'react-file-download';

export const exportLogs = () => {
    axios.get('/api/logs/export', {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('ims-user')).token
        }
    }).then(res => {
        if(res) {
            fileDownload(res.data, 'server.log');
        }
    }).catch(err => {
        if(err.response && err.response.status >= 400) {
            console.log(err.response.data.message);

            if(err.response.status === 403) {
                dispatch({type: 'DE_AUTH'});
            }
        }
    });
};
