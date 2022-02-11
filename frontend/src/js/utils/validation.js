export const kennelNameValidation = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Это поле обязательно!`;
    }
    if (/^[A-za-zА-ЯЁа-яё0-9 - - /—/!/,/@/#/$/%/&/"/’/*/+///=/?/^/_/`/.{|}~-]+$/.test(fieldValue)) {
        return null;
    }
    if (fieldValue.length > 50) {
        return 'Гав, ошибка! Название слишком длинное'
    }
    return "Гав! Название содержит недопустимые символы";
};

export const nameValidation = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Это поле обязательно!`;
    }
    if (/^[A-za-zА-ЯЁа-яё - - /.]+$/.test(fieldValue)) {
        return null;
    }
    if (fieldValue.length > 50) {
        return 'Гав, ошибка! Имя слишком длинное'
    }
    return "Гав, ошибка! Имя содержит недопустимые символы";
};

export const emailValidation = email => {
    if (
        /^[a-zA-ZА-ЯЁа-яё0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-ZА-ЯЁа-яё0-9-]+(?:\.[a-zA-ZА-ЯЁа-яё0-9-]+)*$/.test(
            email
        )
    ) {
        return null;
    }
    if (email.trim() === "") {
        return "Это поле обязательно!";
    }
    return "Гав, ошибка! Проверьте адрес почты. Возможно, недопустимые символы";
};

export const contactEmailValidation = (email, isChecked) => {
    if (isChecked) {
        return null
    } else {
        if (
            /^[a-zA-ZА-ЯЁа-яё0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-ZА-ЯЁа-яё0-9-]+(?:\.[a-zA-ZА-ЯЁа-яё0-9-]+)*$/.test(
                email
            )
        ) {
            return null;
        }
        if (email.trim() === "") {
            return "Это поле обязательно!";
        }
        return "Гав, ошибка! Проверьте адрес почты. Возможно, недопустимые символы";
    }
};

export const phoneValidation = phone => {
    if (
        /^\+?[0-9]+$/.test(
            phone
        )
    ) {
        return null;
    }
    if (phone.trim() === "") {
        return "Это поле обязательно!";
    }
    return "Гав! Где-то ошибка";
};

export const noEmptyValidation = (fieldValue) => {
    if (fieldValue.length === 0) {
        return `Это поле обязательно!`;
    }
};

export const passwordValidation = password => {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[/_/—/@/$/!/%/*/#/?/&///.])[A-Za-z\d/@/$/!/%/*/#/?/&/.]{8,}$/.test(password)) {
        return null;
    } else if (password.length === 0) {
        return "Это поле обязательно!";
    } else {
        return 'Пароль должен содержать минимум 8 символов, минимум одну букву, одну цифру и один специальный знак'
    }

}