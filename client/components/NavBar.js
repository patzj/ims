import React from 'react';
import NavLink from './NavLink';

export class NavBar extends React.Component {
    componentDidMount() {
        const links = this.refs.links.children;
        const len = links.length;
        for(let i = 0; i < len; i++) {
            links[i].addEventListener('click', e => {
                for(let j = 0; j < len; j++) {
                    links[j].removeAttribute('class');
                }
                e.target.parentNode.className = 'active';
            });
        }
    }

    render() {
        return (
            <nav className="row">
                <ul ref="links" className="nav nav-tabs col-xs-10 col-xs-offset-1">
                    <NavLink to="/items">
                        <span className="glyphicon glyphicon-object-align-bottom"></span>
                        Items
                    </NavLink>
                    <NavLink to="/transactions">
                        <span className="glyphicon glyphicon-list-alt"></span>
                        Transactions
                    </NavLink>
                    {
                        JSON.parse(localStorage.getItem('ims-user')).role ===
                            'SYSTEM ADMIN' ?
                                <NavLink to="/logs">
                                    <span className="glyphicon glyphicon-pencil">
                                    </span>
                                    Logs</NavLink> : ''
                    }
                    {
                        JSON.parse(localStorage.getItem('ims-user')).role ===
                            'SYSTEM ADMIN' ?
                                <NavLink to="/user-mgmt">
                                    <span className="glyphicon glyphicon glyphicon-user">
                                    </span>
                                    User Management
                                </NavLink>: ''
                    }
                </ul>
            </nav>
        );
    }
};

export default NavBar;
