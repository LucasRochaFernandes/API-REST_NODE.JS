import { expect, it, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const password = '123456'
    const email = 'johndoeauthenticate@example.com'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const password = '123456'
    const email = 'johndoeauthenticate@example.com'
    const passwordHash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: passwordHash,
    })

    await expect(() =>
      sut.execute({
        email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
