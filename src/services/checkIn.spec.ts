import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'
import { MaxDistanceError } from './errors/maxDistanceError'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      phone: '',
      description: '',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2003, 4, 29, 9, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    await expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(29.9568543),
      longitude: new Decimal(-90.0714537),
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -7.2314649,
        userLongitude: -42.1780138,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
