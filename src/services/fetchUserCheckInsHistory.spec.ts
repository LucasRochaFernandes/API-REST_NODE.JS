import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { FetchUserCheckInsHistoryUseCase } from './fetchUserCheckInsHistory'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('Should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('Should be able to fetch paginated user check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
