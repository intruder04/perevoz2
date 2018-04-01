import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({field, value, label, error, type, onChange, autoComplete, checkUserExists}) => {
    return (
        <div className="form-group">
        <label className={classnames("contol-label", {'text-danger': error})}>{label}</label>
        <input 
            value={value}
            onChange={onChange}
            onBlur={checkUserExists}
            type={type}
            autoComplete={autoComplete}
            name={field}
            className={classnames("form-control", {'is-invalid': error})}
        />
        {error && <span className='help-block text-danger'>{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func
}

TextFieldGroup.defautProps = {
    type: 'text'
}

export default TextFieldGroup;