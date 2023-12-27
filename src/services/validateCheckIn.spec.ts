import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { ValidateCheckInUseCase } from './validateCheckIn'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)
  })

  it('Should be able to validate check-in', async () => {
    const checkIn = await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    const { checkIn: checkInValidated } = await sut.execute({
      checkInId: checkIn.id,
    })

    expect(checkInValidated.validated_at).toEqual(expect.any(Date))
  })
  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(async () => {
      await sut.execute({
        checkInId: 'fakeId',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
