import { expect, it, describe, beforeEach } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
