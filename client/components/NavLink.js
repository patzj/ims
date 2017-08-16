import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NavLink extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    render() {
        const isActive = this.context.router.route.location.pathname === this.props.to;
        const className = isActive ? 'active' : '';
        return (
            <li className={className}>
                <Link to={this.props.to}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
};

NavLink.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavLink;
