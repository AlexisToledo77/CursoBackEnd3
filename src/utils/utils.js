import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

process.loadEnvFile("./src/.env")

const customLevels = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    },
    colors: {
        debug: 'blue',
        http: 'magenta',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'redBG'
    }
};
winston.addColors(customLevels.colors);

const transporteConsolaDev = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    )
});

const transporteConsolaProd = new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    )
});

const transporteArchivo = new winston.transports.File({
    level: "error",
    filename: "./src/logs/error.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

let transports = []
if (process.env.MODE === "dev") {
    transports.push(transporteConsolaDev)
} else {
    transports.push(transporteConsolaProd)
    transports.push(transporteArchivo)
}

export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: transports
})