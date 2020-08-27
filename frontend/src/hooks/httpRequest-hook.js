import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeRequest = useRef([]);

    const sendRequest = useCallback(async (url, method = "", body, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeRequest.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal,
            });

            const responseData = await response.json();

            activeRequest.current = activeRequest.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                console.log("response Data =>", responseData, "response =>", response);
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (err) {
            // console.log("paso por el catch:", err.message);
            // console.log(typeof err.message);
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeRequest.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    // console.log("error del hook:", error);

    return { isLoading, error, sendRequest, clearError };
};
