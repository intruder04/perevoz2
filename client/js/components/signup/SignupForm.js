import React from 'react';
import Timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        this.setState({ errors: {}, isLoading: true });
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            () => {},
            () => this.setState({isLoading: false})
        ).catch((error) => {
          this.setState({ errors: error.response.data})
        });
        console.log(this.state);
    }

    render() {
        const { errors } = this.state;
        const timeZoneOptions = map(Timezones, (val, key) => 
            <option key={val} value={val}>{key}</option>
                 );
        return (
           <form onSubmit={this.onSubmit}>
               <h1>Hey</h1>
                    <div className="form-group">
                        <label className={classnames("contol-label", {'text-danger':errors.username})}>Username</label>
                        <input value={this.state.username} onChange={this.onChange} type="text" name="username" className={classnames("form-control", {'is-invalid':errors.username})}/>
                        {errors.username  && <span className='help-block text-danger'>{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input value={this.state.password} onChange={this.onChange} type="text" name="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password Confirmation</label>
                        <input value={this.state.passwordConfirmation} onChange={this.onChange} type="text" name="passwordConfirmation" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Timezone</label>
                        <select value={this.state.timezone} onChange={this.onChange} type="text" name="timezone" className="form-control">
                        <option value="" disabled>Choose timezone</option>
                        {timeZoneOptions}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input value={this.state.email} onChange={this.onChange} type="text" name="email" className="form-control"/>
                    </div>
               <div className="form-group">
               <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
               </div>
           </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;