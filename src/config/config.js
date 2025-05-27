import dotenv from 'dotenv'
import { Command, Option } from 'commander'
import mongoose from 'mongoose'
import { logger } from '../utils/utils.js'

mongoose.set('strictQuery', false)

const program = new Command()

program.addOption(new Option("-m, --mode <MODE>", "Modo de ejecucion del server").choices(["dev", "prod"]).default("dev"))

program.parse()
const { mode } = program.opts()

dotenv.config({ path: mode === "dev" ? "./src/.env" : "./src/.env.prod" })

export const config = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
}

export const connDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                dbName: process.env.DB_NAME,
            }
        )
        logger.info("DB contectada...")
    } catch (error) {
        logger.warn(`Error al conectar a DB: ${error}`)
    }
}

export default config

