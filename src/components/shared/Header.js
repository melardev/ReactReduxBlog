import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from "react-router-dom";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: ''};
    }

    componentWillMount() {
        if (window.location.pathname === '/' || window.location.pathname === '/articles')
            this.setState({active: 'home'});
        else if (window.location.pathname === '/about')
            this.setState({active: 'about'});
    }

    render() {
        console.log(this.state.active);
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">React-Redux Blog</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                    {this.state.active === 'home' && <span className="sr-only">(current)</span>}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
                                {this.state.active === 'about' && <span className="sr-only">(current)</span>}
                            </li>

                            {this.props.is_author || this.props.is_admin &&
                            <li className="nav-item">
                                <Link className="nav-link" to='/articles/new'>Create</Link>
                            </li>
                            }
                            {this.props.is_authenticated ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/profile" className="nav-link">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/logout" className="nav-link">Logout</Link>
                                        </li>
                                    </>
                                ) :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

// take the is_authenticated boolean from redux's store and place
// it into this.props.is_authenticated
function mapStateToProps(state, props) {
    return {
        is_authenticated: state.AuthReducer.is_authenticated,
        is_admin: state.AuthReducer.user.is_admin || false,
        is_author: state.AuthReducer.user.is_author || false,
    }
}

// We want is_authenticated boolean from the redux's store so we connect
// our component to redux
export default connect(mapStateToProps)(HeaderComponent);
