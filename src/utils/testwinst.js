import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from "winston"

process.loadEnvFile("./src/.env")

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const logger2 = winston.createLogger({
    levels: { "debug": 5, "http": 4, "info": 3, "warning": 2, "error": 1, "fatal": 0 },
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: {
                        "debug": "blue",
                        "http": "magenta",
                        "info": "green",
                        "warning": "yellow",
                        "error": "red",
                        "fatal": "red"
                    }
                }),
                winston.format.timestamp(),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: "error",
            filename: "./src/logs/error.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
}
)

const transporteConsolaDev = new winston.transports.Console({
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
    level: "error",
    filename: "./src/logs/error.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
})


let transports = []

if (process.env.MODE == "dev") {
    transports.push(transporteConsolaDev)
} else {
    transports.push(transporteConsolaProd)
}

export const logger = winston.createLogger({
    transports: transports
})