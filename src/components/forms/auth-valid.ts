const required = (field: string) => (value :string) =>  value ? undefined : `Заполните ${field}`;

export const requiredUsername = (value :string) => required("имя");
export const requiredEmail = (value :string) => required("email");
export const requiredPassword = (value :string) => required("пароль");

const controllLength = (field: string,min: number,max: number) => (value: string) => {
    if(value && (value.length > max || value.length < min)) {
        field[0].toUpperCase();
        return `${field} должно содержаться не менее ${min} и не более ${max} символов`;
    } 
    return undefined;
}

export const usernameLength = controllLength("имя", 4, 12);
export const passwordLength = controllLength("пароль", 8, 15);

export const email = (value: string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Вы ввели не коректный email' : undefined