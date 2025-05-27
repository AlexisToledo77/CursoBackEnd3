import { logger } from '../utils/utils.js'
import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
    // req.logger.debug("test debug logger")
    // req.logger.http("test http logger")
    // req.logger.info("test info logger")
    // req.logger.warn("test warn logger")
    // req.logger.error("test error logger")
    logger.debug("Debug log");
    logger.http("HTTP log");
    logger.info("Info log");
    logger.warning("Warning log");
    logger.error("Error log");
    logger.fatal("Error log");
    res.send("Logs generados");
})

export default router