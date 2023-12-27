import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gymsRepository'

interface SearchNearbyGymsUseCaseRequest {
  userlatitude: number
  userlongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userlatitude,
    userlongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userlatitude,
      longitude: userlongitude,
    })
    return { gyms }
  }
}
