import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    // gestion de la action
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            // Validation pour chaque objet html, il valide avec l'id et le changement d'état de l'objet
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            // Après, il crée une copie de l'état précédent et ajoutes le nouveau état
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
                isValid: action.formIsValid,
            };
        default:
            return state;
    }
};

// Composant
export const useForm = (initialInputs, initialFormValidity) => {
    // Fonction pour établir l'état initiale des objets html et envoie les donnés à formState
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    // Fonction pour capturer les valeurs des objets html et envoie les donnés à formState
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    // Fonction pour reinitialiser le formState des objets html et envoie les donnés à formState
    const setFormState = useCallback((inputData, formValidity) => {
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidity,
        });
    }, []);

    return [formState, inputHandler, setFormState];
};
