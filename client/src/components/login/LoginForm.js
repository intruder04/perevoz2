import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.identifier)) {
        errors.identifier = 'Это поле обязательно!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Это поле обязательно!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            console.log('not valid login on client side');
        }
        return isValid;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                (res) => this.props.history.push('/calls'),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            );
            console.log(this.state);
        }
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;

        return (
           <form onSubmit={this.onSubmit}>
               <h1>Вход</h1>
                { errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                    error = {errors.identifier}
                    label = "Имя пользователя или Email"
                    onChange = {this.onChange}
                    value = {identifier}
                    field = "identifier"
                    autoComplete = "username"
                />
                <TextFieldGroup
                    error = {errors.password}
                    label = "Пароль"
                    onChange = {this.onChange}
                    value = {password}
                    field = "password"
                    autoComplete = "password"
                    type = "password"
                />
               <div className="form-group">
               <button disabled={isLoading} className="btn btn-primary btn-lg">Войти</button>
               </div>
           </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, {login})(LoginForm);