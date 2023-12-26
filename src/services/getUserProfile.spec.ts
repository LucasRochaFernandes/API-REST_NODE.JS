import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './getUserProfile'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get user profile', async () => {
    const password = '123456'
    const email = 'johndoeprofile@example.com'
    const passwordHash = await hash(password, 6)

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: passwordHash,
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('Should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'fakeId',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
