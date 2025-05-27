import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { logger } from '../utils/testwinst.js'
dotenv.config({ path: './src/.env' })

mongoose.set('strictQuery', false)

export const config = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    MODE: process.env.MODE
}

export const connDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                dbName: process.env.DB_NAME,
            }
        )
        
        logger.info("DB conectada...")
    } catch (error) {
        logger.error(`Error al conectar a DB: ${error}`)
    }
}

export default config
