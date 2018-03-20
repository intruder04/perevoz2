import React from 'react';
import Timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import browserHistory from 'react-router-dom';

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
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            console.log('not valid on client side');
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
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Вы успешно зарегистрировались!'
                    });
                    console.log(this.props);
                    this.props.history.push('/');
                },
                () => this.setState({isLoading: false})
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
                        value = {this.state.username}
                        field = "username"
                        autoComplete = "username"
                    />
                    <TextFieldGroup
                        error = {errors.email}
                        label = "Email"
                        onChange = {this.onChange}
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
               <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Зарегистрироваться</button>
               </div>
           </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default SignupForm;