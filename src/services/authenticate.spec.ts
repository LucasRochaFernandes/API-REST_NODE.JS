import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate an user', async () => {
    const password = '123456'
    const email = 'johndoeauthenticate@example.com'
    const passwordHash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: passwordHash,
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    const password = '123456'
    const email = 'johndoeauthenticate@example.com'

    await expect(
      async () =>
        await sut.execute({
          email,
          password,
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const password = '123456'
    const email = 'johndoeauthenticate@example.com'
    const passwordHash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: passwordHash,
    })

    await expect(
      async () =>
        await sut.execute({
          email,
          password: '654321',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
