import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { SearchNearbyGymsUseCase } from './fetchNearbyGyms'

let sut: SearchNearbyGymsUseCase
let gymsRepository: InMemoryGymsRepository

describe('Search Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to search nearby gyms', async () => {
    const nearbyGym = await gymsRepository.create({
      title: 'Python Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: 'Java Gym',
      description: '',
      phone: '',
      latitude: 100,
      longitude: -100,
    })

    const { gyms } = await sut.execute({
      userlatitude: 0,
      userlongitude: 0,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ id: nearbyGym.id })])
  })
})
