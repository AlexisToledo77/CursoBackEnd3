import { Router } from 'express'
import { generateMockUsers, generateMockData, generateMockPets, generateUsers, generatePets } from '../controllers/mocks.controller.js'

const router = Router()

router.get('/mockingusers', generateMockUsers)
router.post('/mockingusers/:userCount', generateUsers)
router.get ('/mockingpets', generateMockPets)
router.post('/mockingpets/:petCount', generatePets)
router.post('/generateData/:userCount/:petCount', generateMockData)

export default router