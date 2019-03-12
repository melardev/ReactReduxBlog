import React from "react";
import {connect} from "react-redux";
import swal from 'sweetalert2'
import {UiActionCreator} from "../../actions/ui.actions";
import {ToastContainer, toast} from 'react-toastify';

class Notifications extends React.Component {
    state = {
        last_message: ''
    };

    render() {
        // Make sure we have something to show && Not repeated message
        if (this.props.toast.message !== "" && this.state.last_message !== this.props.toast.message) {
            this.setState({last_message: this.props.toast.message});
            toast(<div className={this.props.toast.message.className || "alert alert-success"}>
                <span>{this.props.toast.message.title || 'Message'}</span>: {this.props.toast.message}</div>, {
                closeButton: false // Remove the super ugly close button that ships by default
            });

        } else if (this.props.alert.message !== "") {

            let type = 'info';
            const classname = this.props.toast.className;
            if (classname.indexOf('success') !== -1)
                type = 'success';
            else if (classname.indexOf('error') !== -1 || classname.indexOf('danger') !== -1)
                type = 'error';
            else
                type = 'info';

            swal.fire({
                title: 'Notification',
                text: this.props.toast.message,
                type,
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                timer: 4000
            });
            this.props.clearToast();

        } else if (this.props.is_loading) {

        }
        return (
            <ToastContainer/>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToast: () => dispatch(UiActionCreator.clearToast())
    }
};
const mapStateToProps = (state) => {
    return {
        is_loading: state.ArticleReducer.is_loading || state.TagsReducer.is_loading || state.CategoriesReducer.is_loading
            || state.AuthReducer.is_trying_to_register || state.AuthReducer.is_trying_to_login,
        alert: state.UiReducer.alert,
        toast: state.UiReducer.toast
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);