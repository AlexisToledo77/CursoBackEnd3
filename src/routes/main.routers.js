import { logger } from '../utils/utils.js'
import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
    logger.debug("Debug log");
    logger.http("HTTP log");
    logger.info("Info log");
    logger.warn("Warning log");
    logger.error("Error log");
    logger.fatal("Fatal log");
    res.send("Logs generados");
})

export default router