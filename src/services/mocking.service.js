import bcrypt from 'bcrypt';
import { faker as fa } from '@faker-js/faker'

fa.locale = 'es'

export const createMockUsers = (count = 1) => {
    return Array.from({ length: count }, () => {
        let first_name = fa.person.firstName()
        let last_name = fa.person.lastName()
        let email = fa.internet.email({ firstName: first_name, lastName: last_name })
        let role = fa.helpers.arrayElement(['user', 'admin'])
        let password = bcrypt.hashSync('coder123', 10)
        let pets = []

        return {
            first_name,
            last_name,
            email,
            role,
            password,
            pets
        }
    })
}

export const createMockPets = (count = 1) => {
    return Array.from({ length: count }, () => {
        let name = fa.person.firstName()
        let specie = fa.helpers.arrayElement(['perro', 'gato'])
        let owner = null
        let adopted = false

        return {
            name,
            specie,
            owner,
            adopted
        }
    })

}
