import { faker } from '@faker-js/faker'

export function generateUserData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 })
  }
}