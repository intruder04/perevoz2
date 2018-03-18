import React from 'react';
import Timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

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
                () => {},
                () => this.setState({isLoading: false})
            ).catch((error) => {
            this.setState({ errors: error.response.data})
            });
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
                        <label className="control-label">Часовой пояс</label>
                        <select value={this.state.timezone} onChange={this.onChange} type="text" name="timezone" className="form-control">
                        <option value="" disabled>Выберите временную зону</option>
                        {timeZoneOptions}
                        </select>
                    </div>
                   
               <div className="form-group">
               <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
               </div>
           </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;