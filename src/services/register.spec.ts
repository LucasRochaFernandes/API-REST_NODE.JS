import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register an user', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('Should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
