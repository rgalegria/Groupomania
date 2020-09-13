import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
    // UseState du AuthContext
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [account, setAccount] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    // Login usCallback pour ne pas rentrer dans un cycle infinit
    const login = useCallback((userId, token, account, expirationDate) => {
        setUserId(userId);
        setToken(token);
        setAccount(account);

        // Creér une date 24h dans le futur (validité de la session)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        setTokenExpirationDate(tokenExpirationDate);

        // Stocker les paramètres dans le localStorage du navigateur
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: userId,
                token: token,
                account: account,
                expiration: tokenExpirationDate.toISOString(),
            })
        );
    }, []);

    // logout remets tout à null et supprime l'objet du localStorage
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setAccount(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
    }, []);

    // Timer de la session
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    // Auto-login à l'application en utilisant le localStorage pour s'identifier
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (
            storedData &&
            storedData.userId &&
            storedData.token &&
            storedData.account &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token, storedData.account, new Date(storedData.expiration));
        }
    }, [login]);

    return { userId, token, account, login, logout };
};
