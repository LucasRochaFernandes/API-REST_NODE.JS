import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

import { CreateGymUseCase } from './createGym'

let sut: CreateGymUseCase
let gymsRepository: InMemoryGymsRepository

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Python Gym',
      description: 'Great Gym',
      phone: '9900',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
