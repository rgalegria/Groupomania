import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            };
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.isValid,
            };
        default:
            return state;
    }
};

export const useForm = (initialInput, initialFormValidation) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInput,
        isValid: initialFormValidation,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    const setFormData = useCallback((inputData, formValidation) => {
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidation,
        });
    }, []);

    return [formState, inputHandler, setFormData];
};
