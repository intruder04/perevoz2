import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
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