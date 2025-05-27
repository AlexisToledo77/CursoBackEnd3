import { logger } from '../utils/utils.js'
import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
    logger.debug("Debug log")
    logger.http("HTTP log")
    logger.info("Info log")
    logger.warning("Warning log")
    logger.error("Error log")
    logger.fatal("Error log")
    res.send("Logs generados")
})

export default router