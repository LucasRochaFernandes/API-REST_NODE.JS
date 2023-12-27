import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { SearchGymUseCase } from './searchGym'
import { Decimal } from '@prisma/client/runtime/library'

let sut: SearchGymUseCase
let gymsRepository: InMemoryGymsRepository

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('Should be able to search a gym', async () => {
    const createdGym = await gymsRepository.create({
      title: 'Python Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    const { gyms } = await sut.execute({
      query: createdGym.title,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })
})
