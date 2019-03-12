import React from "react";
import {AuthActionCreators} from "../../actions/auth.actions";
import {connect} from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
            },
            message: '',
            show_message: false,
            classNameForMessage: '',
        };

        // already authenticated users redirect them back to home
        if (props.is_authenticated)
            props.history.push('/');
    }

    onSubmitForm(evt) {
        this.props.submitForm(this.state.form);
    }

    onInputChange(key, evt) {
        this.setState({
            form: {
                ...this.state.form,
                [key]: evt.target.value
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // if(nextProps.is_authenticated)
        if (this.props.is_authenticated === false && nextProps.is_authenticated === true) {
            nextProps.history.push('/');
        }
    }


    render() {
        return (
            <div className="container" style={{marginTop: "100px"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row d-flex justify-content-center align-items-center">
                            <form className="form-horizontal">
                                <fieldset>
                                    <div id="legend">
                                        <legend className="">Login</legend>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="username">Username</label>
                                        <div className="controls">
                                            <input type="text" id="username" name="username"
                                                   value={this.state.form.username}
                                                   onChange={(evt) => this.onInputChange('username', evt)}
                                                   placeholder="your username"
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <div className="controls">
                                            <input type="password" id="password"
                                                   name="password" placeholder="your password"
                                                   value={this.state.form.password}
                                                   onChange={(evt) => this.onInputChange('password', evt)}
                                                   className="form-control"/>
                                            <p className="help-block">the password you will be using</p>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <div className="controls">
                                            <button className="btn btn-success" type="button"
                                                    onClick={this.onSubmitForm.bind(this)}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        submitForm: (loginForm) => dispatch(AuthActionCreators.login(loginForm)),
    };
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.AuthReducer.is_authenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
