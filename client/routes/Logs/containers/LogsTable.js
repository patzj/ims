import React from 'react';
import { connect } from 'react-redux';
import { deAuthenticate } from '../../../actions/auth-action';

class LogsTable extends React.Component {
    componentDidUpdate() {
        $('#logs-table').DataTable().ajax.reload();
    }

    componentDidMount() {
        $('#logs-table').DataTable({
            ajax: {
                url: '/api/logs',
                dataSrc: 'logs',
                beforeSend: function(req) {
                    const token = JSON.parse(localStorage.getItem('ims-user')).token;
                    req.setRequestHeader('x-access-token', token);
                },
                error: function(xhr, error, thrown) {
                    if(xhr.status === 403) {
                        this.props.deAuthenticate();
                    };
                }.bind(this)
            },
            order: [
                [2, 'des']
            ],
            columns: [
                {
                    data: null,
                    render: function(data) {
                        let className = '';
                        switch(data.level) {
                            case 'error':
                                className = 'text-danger';
                                break;
                            case 'warn':
                                className = 'text-warning';
                                break;
                            default:
                                className = 'text-info';
                                break;
                        }
                        return `<span class="${className}">${data.level}</span>`;
                    }
                },
                {data: 'message'},
                {
                    data: null,
                    render: function(data) {
                        const d = new Date(data.timestamp);
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                    }
                }
            ]
        });
    }

    render() {
        return (
            <div>
                <table id="logs-table" className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Message</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        deAuthenticate: () => dispatch(deAuthenticate())
    };
};

LogsTable = connect(mapStateToProps, mapDispatchToProps)(LogsTable);

export default LogsTable;
