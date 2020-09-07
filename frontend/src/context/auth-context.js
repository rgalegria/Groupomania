import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    account: null,
    login: () => {},
    logout: () => {},
});
