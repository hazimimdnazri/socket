class Logger {
    constructor(serviceName = 'WebSocket Server') {
        this.serviceName = serviceName;
        this.logLevels = ['error', 'warn', 'info', 'debug'];
        this.currentLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
    }

    #formatMessage(level, message, meta = {}) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            service: this.serviceName,
            level: level,
            message: message,
            ...meta
        });
    }

    #shouldLog(level) {
        return this.logLevels.indexOf(level) <= this.logLevels.indexOf(this.currentLevel);
    }

    log(level, message, meta) {
        if (!this.#shouldLog(level)) return;
        const formatted = this.#formatMessage(level, message, meta);
        console.log(formatted);
    }

    info(message, meta) {
        this.log('info', message, meta);
    }

    warn(message, meta) {
        this.log('warn', message, meta);
    }

    error(message, meta) {
        this.log('error', message, meta);
    }

    debug(message, meta) {
        this.log('debug', message, meta);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }
}

export default Logger;
