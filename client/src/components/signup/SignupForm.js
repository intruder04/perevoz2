import React from 'react';
import Timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Укажите email адрес'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Формат email не верный';
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Укажите имя пользователя'
    }
    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = 'Укажите временную зону'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Укажите пароль'
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Подтверждение пароля обязательно';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Пароли не совпадают';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            timezone: '',
            errors: {},
            isLoading: false,
            formInvalid: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            console.log('not valid on client side');
        }
        return isValid;
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        console.log('in checkUserExists event handler');
        let errors = this.state.errors;
        if (val !== '') {
            console.log(this.props);
            this.props.isUserExists(val).then(res => {
                if (res.data.user) {
                    errors[field] = 'Есть пользователь с таким ' + field;
                    this.setState({formInvalid: true});
                } else {
                    errors[field] = '';
                    this.setState({formInvalid: false});
                }
                this.setState({errors});
            });
        } 
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Вы успешно зарегистрировались!'
                    });
                    console.log(this.props);
                    this.props.history.push('/');
                },
                (err) => this.setState({ errors: err.response.data, isLoading: false})
            );
            console.log(this.state);
        }
    }

    render() {
        const { errors } = this.state;
        const timeZoneOptions = map(Timezones, (val, key) => 
            <option key={val} value={val}>{key}</option>
                 );
        return (
           <form onSubmit={this.onSubmit}>
               <h1>Регистрация</h1>
                    <TextFieldGroup
                        error = {errors.username}
                        label = "Имя пользователя"
                        onChange = {this.onChange}
                        checkUserExists = {this.checkUserExists}
                        value = {this.state.username}
                        field = "username"
                        autoComplete = "username"
                    />
                    <TextFieldGroup
                        error = {errors.email}
                        label = "Email"
                        onChange = {this.onChange}
                        checkUserExists = {this.checkUserExists}
                        value = {this.state.email}
                        field = "email"
                        autoComplete = "email"
                    />
                    <TextFieldGroup
                        error = {errors.password}
                        label = "Пароль"
                        onChange = {this.onChange}
                        value = {this.state.password}
                        field = "password"
                        type = "password"
                        autoComplete = "new-password"
                    />
                    <TextFieldGroup
                        error = {errors.passwordConfirmation}
                        label = "Подтверждение пароля"
                        onChange = {this.onChange}
                        value = {this.state.passwordConfirmation}
                        field = "passwordConfirmation"
                        type = "password"
                        autoComplete = "new-password"
                    />

                    <div className="form-group">
                        <label className={classnames("contol-label", {'text-danger': errors.timezone})}>Часовой пояс</label>
                        <select value={this.state.timezone} onChange={this.onChange} type="text" name="timezone" className={classnames("form-control", {'is-invalid': errors.timezone})}>
                        <option value="" disabled>Выберите временную зону</option>
                        {timeZoneOptions}
                        </select>
                        {errors.timezone && <span className='help-block text-danger'>{errors.timezone}</span>}
                    </div>
                    
                   
               <div className="form-group">
               <button disabled={this.state.isLoading || this.state.formInvalid} className="btn btn-primary btn-lg">Зарегистрироваться</button>
               </div>
           </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}

export default SignupForm;