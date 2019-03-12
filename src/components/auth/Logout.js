import React from 'react';
import {AuthActionCreators} from '../../actions/auth.actions';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Logout extends React.Component {

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return (
            <div className="well text-center">
                <h1>
                    Logged out successfully
                </h1>
                <NavLink to="/">Home</NavLink>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthActionCreators.logout(dispatch))
    }
}


// export default connect(null, {logout})(Logout);
// export default connect(null, {logout: AuthActionCreators.logout})(Logout);
export default connect(null, mapDispatchToProps)(Logout);
// export default connect(null, mapDispatchToProps)(Logout);