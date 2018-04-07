import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
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