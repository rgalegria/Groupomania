const REQUIRED = "REQUIRED";
const MINLENGTH = "MINLENGTH";
const MAXLENGTH = "MAXLENGTH";
const MIN = "MIN";
const MAX = "MAX";
const EMAIL = "EMAIL";
const FILE = "FILE";
const TEXT = "TEXT";

export const isRequired = () => ({ type: REQUIRED });
export const isFile = () => ({ type: FILE });

export const MinLength = (val) => ({
    type: MINLENGTH,
    val: val,
});

export const MaxLength = (val) => ({
    type: MAXLENGTH,
    val: val,
});

export const isMin = (val) => ({ type: MIN, val: val });

export const isMax = (val) => ({ type: MAX, val: val });

export const isText = () => ({ type: TEXT });

export const isEmail = () => ({ type: EMAIL });

export const validate = (value, validators) => {
    let isValid = true;

    for (const validator of validators) {
        if (validator.type === REQUIRED) {
            isValid = isValid && value.trim().length > 0;
        }

        if (validator.type === MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }

        if (validator.type === MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }

        if (validator.type === MIN) {
            isValid = isValid && +value >= validator.val;
        }

        if (validator.type === MAX) {
            isValid = isValid && +value <= validator.val;
        }

        if (validator.type === TEXT) {
            isValid = isValid && /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ '-]+$/i.test(value);
        }

        if (validator.type === EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }

    return isValid;
};
