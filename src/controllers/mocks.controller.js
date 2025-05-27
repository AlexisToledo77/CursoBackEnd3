import { createMockUsers, createMockPets } from '../services/mocking.service.js'
import User from '../dao/models/User.js'
import Pet from '../dao/models/Pet.js'
import { CustomError } from '../utils/CustomError.js'
import { TIPOS_ERROR } from '../utils/EErrores.js'

export const generateMockUsers = async (req, res, next) => {
    try {
        const users = createMockUsers(50)
        const UsersBD = await User.insertMany(users)
        res.json(UsersBD)
    } catch (error) {
        const customError = CustomError.createError(
            'Error al generar usuarios', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de usuarios a crear', TIPOS_ERROR.ERRORES_USERS)
        next(customError)
    }
}

export const generateMockPets = async (req, res, next) => {
    try {
        const pets = createMockPets(100)
        const PetsBD = await Pet.insertMany(pets)
        res.json(PetsBD)
    } catch (error) {
        const customError = CustomError.createError(
            'Error al generar mascotas', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de mascotas a crear', TIPOS_ERROR.ERRORES_PETS)
        next(customError)
    }
}

export const generateUsers = async (req, res, next) => {
    const userCount = parseInt(req.params.userCount, 10)

    if (isNaN(userCount)) {
        const customError = CustomError.createError(
            'Error al generar usuarios', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de usuarios a crear', TIPOS_ERROR.ERRORES_USERS)
        next(customError)
    }
    try {
        const users = createMockUsers(userCount)
        const UsersBD = await User.insertMany(users)
        res.json(UsersBD)
    } catch (error) {
        next(error)
    }
}

export const generatePets = async (req, res, next) => {
    const petCount = parseInt(req.params.petCount, 10)

    if (isNaN(petCount)) {
        const customError = CustomError.createError(
            'Error al generar mascotas', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de mascotas a crear', TIPOS_ERROR.ERRORES_PETS)
        next(customError)
    }
    try {
        const pets = createMockPets(petCount)
        const PetsBD = await Pet.insertMany(pets)
        res.json(PetsBD)
    } catch (error) {
        next(error)
    }
}

export const generateMockData = async (req, res, next) => {
    const userCount = parseInt(req.params.userCount, 10)
    const petCount = parseInt(req.params.petCount, 10)
    if (isNaN(userCount)) {
        const customError = CustomError.createError(
            'Error al generar usuarios', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de usuarios a crear', TIPOS_ERROR.ERRORES_USERS)
        next(customError)
    }
    if (isNaN(petCount)) {
        const customError = CustomError.createError(
            'Error al generar mascotas', 'Se ha ingresado un valor incorrecto', 'Solo se admiten valores positivos de mascotas a crear', TIPOS_ERROR.ERRORES_PETS)
        next(customError)
    }
    try {
        const users = createMockUsers(userCount)
        const grabaUsers = await User.insertMany(users)

        const pets = createMockPets(petCount)
        const grabaPets = await Pet.insertMany(pets)

        res.json({ users: grabaUsers, pets: grabaPets })

    } catch (error) {
        next(error)
    }

}