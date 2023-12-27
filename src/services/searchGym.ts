import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gymsRepository'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
