import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4"></div>
                <LoginForm 
                    history={this.props.history}
                />
            </div>
        );
    }
}


export default Login;