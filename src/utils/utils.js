import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from "winston"

process.loadEnvFile("./src/.env")

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'magenta',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'redBG'
    }
}
winston.addColors(customLevels.colors)

const transporteConsola = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    )
})

const transporteConsolaProd = new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    )
})

const transporteArchivo = new winston.transports.File({
    level: "warn",
    filename: "./src/logs/error.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
})

const transporteError = new winston.transports.File({
    level: "error",
    filename: "./src/logs/errors.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});



let transports = []
if (process.env.MODE == "dev") {
    transports.push(transporteConsola)
} else {
    transports.push(transporteConsolaProd)
    transports.push(transporteError)
}

export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: transports
})