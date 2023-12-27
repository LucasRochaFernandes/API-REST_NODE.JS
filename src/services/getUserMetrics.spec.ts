import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { GetUserMetricsUseCase } from './getUserMetrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('Should be able to get check-ins count from user metrics', async () => {
    const leghtCheckInsList = 20
    for (let i = 1; i <= leghtCheckInsList; i++) {
      await checkInRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(leghtCheckInsList)
  })
})
