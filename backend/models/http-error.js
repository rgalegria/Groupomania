class HttpError extends Error {
    constructor(message, errorCode) {
        // Ajoute un proprieté de message
        super(message);
        // Ajoute un proprieté de code http
        this.code = errorCode;
    }
}

module.exports = HttpError;
